module API
  module V1
    class Auth < Grape::API
      include API::V1::Defaults

      helpers do
        def represent_user_with_token user
          present jwt_token: Authentication.encode(user_id: user.id)
        end
      end

      resources :auth do
        desc "Sign in"
        params do
          requires :email
          requires :password
        end

        post "/login" do
          user = User.find_by email: params[:email]
          if user&.valid_password? params[:password]
            represent_user_with_token user
          else
            {
              message: "Invalid email/password combination", 
              code: 401
            }
          end
        end
      end
    end
  end
end
