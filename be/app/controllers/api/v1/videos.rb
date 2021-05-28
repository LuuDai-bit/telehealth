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
        end
        post "/search/:page/:per", root: :videos do
          results = []
          page = params[:page].to_i
          per = params[:per].to_i

          sequences = Sequence.search params[:content], 
                                      fields: [:result], 
                                      select: [:result, :video_id, :start_at, :end_at]
          start_record = page * per + 1
          end_record = (page + 1 ) * per
          total_video = sequences.each.pluck(:video_id).uniq.length
          video_ids = sequences.each.pluck(:video_id).uniq[start_record..end_record]
          videos = Video.where id: video_ids
          if params[:code]
            videos.unshift Video.find_by code: params[:code]
          end
          videos.each do |video|
            result = {
              video: video,
              sequences: sequences.select { |s| s.video_id == video.id }
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
