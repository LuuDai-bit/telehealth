module API
  module V1
    class Categories < Grape::API
      include API::V1::Defaults

      before do
        authenticate_user!
      end

      resource :categories do
        desc "Return all categories"
        get "", root: :categories do
          Category.all
        end
      end
    end
  end
end
