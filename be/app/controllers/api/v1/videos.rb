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
          optional :duration, type: String, desc: "the length of the video"
          optional :category, type: String, desc: "the category of the video"
          optional :created_at_start, type: String, desc: "the time video created start"
          optional :created_at_end, type: String, desc: "the time video created end"
          optional :search_operator, type: String, desc: "the search operator"
        end
        post "/search/:page/:per", root: :videos do
          results = []

          #Calculate min max duration
          if params[:duration].present?
            min_duration = Settings.filter.duration[params[:duration]].start * 60
            max_duration = Settings.filter.duration[params[:duration]].end * 60
          else
            min_duration = ""
            max_duration = ""
          end

          #Chossing search operator
          search_operator = params[:search_operator].blank? ? "and" : params[:search_operator]
          
          #Query sequences from elastic search
          sequences = Sequence.search params[:content], 
                                      operator: search_operator,
                                      fields: [:result],
                                      highlight: { tag: "<strong class='highlight'>" }
         
          #Filter videos
          video_ids = sequences.each.pluck(:video_id)
          videos = Video.with_ids(video_ids)
                        .with_duration(min_duration, max_duration)
                        .page(params[:page])
                        .per params[:per]

          total_sequences = 0
          videos.each do |video|
            video_sequences = sequences.with_highlights
                                       .map { |s| { id: s[0].id,
                                                    result: s[1][:result], 
                                                    start_at: s[0].start_at, 
                                                    end_at: s[0].end_at} if s[0].video_id.eql? video.id }
                                       .compact
            total_sequences += video_sequences.length
            result = {
              video: video,
              sequences: video_sequences
            }
            results.push result
          end

          {
            result: results,
            total: videos.total_count,
            total_sequences: total_sequences,
            time: sequences.took
          }
        end
      end
    end
  end
end
