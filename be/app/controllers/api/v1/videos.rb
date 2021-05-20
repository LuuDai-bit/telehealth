module API
  module V1
    class Videos < Grape::API
      include API::V1::Defaults

      # before do
      #   authenticate_user!
      # end

      resource :videos do
        desc "Return all videos"
        get ":page/:per", root: :videos do
          Video.page(params[:page]).per params[:per]
        end

        desc "Return a video"
        params do
          requires :id, type: String, desc: "ID of the video"
        end
        get ":id", root: "video" do
          
        end
      end
    end
  end
end
