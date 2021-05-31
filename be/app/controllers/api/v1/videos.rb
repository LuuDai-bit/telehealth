module API
  module V1
    class Videos < Grape::API
      include API::V1::Defaults

      before do
        authenticate_user!
      end

      resource :videos do
        desc "Return all videos"
        get ":page/:per", root: :videos do
          Video.page(params[:page]).per params[:per]
        end

        desc "Return total videos"
        get "total", root: :videos do 
          Video.count
        end

        desc "Return a video"
        params do
          requires :id, type: String, desc: "ID of the video"
        end
        get ":id", root: "video" do
          
        end

        desc "Return search results"
        params do 
          requires :content, type: String, desc: "the subcription of the video"
          optional :code, type: String, desc: "the code of the video"
          optional :length, type: String, desc: "the length of the video"
          optional :category, type: String, desc: "the category of the video"
          optional :created_at_start, type: String, desc: "the time video created start"
          optional :created_at_end, type: String, desc: "the time video created end"
        end
        post "/search/:page/:per", root: :videos do
          results = []
          page = params[:page].to_i
          per = params[:per].to_i
          
          if params[:length].present?
            min_duration = Settings.filter.duration[params[:length]].start * 60
            max_duration = Settings.filter.duration[params[:length]].end * 60
          else
            min_duration = ""
            max_duration = ""
          end
          
          sequences = Sequence.search params[:content], 
                                      fields: [:result],
                                      highlight: true,
                                      highlight: { tag: "<strong class='highlight'>" }
         
          start_record = page * per + 1
          end_record = (page + 1 ) * per
          total_video = sequences.each.pluck(:video_id).uniq.length
          video_ids = sequences.each.pluck(:video_id).uniq[start_record..end_record]
          videos = Video.with_ids(video_ids)
                        .with_duration(min_duration, max_duration)
                        # .with_created_at(created_at_start, created_at_end)
          if params[:code]
            videos.unshift Video.find_by code: params[:code]
          end
          videos.each do |video|
            result = {
              video: video,
              sequences: sequences.with_highlights
                                  .map { |s| { id: s[0].id,
                                               result: s[1][:result], 
                                               start_at: s[0].start_at, 
                                               end_at: s[0].end_at} if s[0].video_id.eql? video.id }
                                  .compact
            }
            results.push result
          end
          
          {
            result: results,
            total: total_video,
            total_sequences: sequences.total_count,
            time: sequences.took
          }
        end
      end
    end
  end
end
