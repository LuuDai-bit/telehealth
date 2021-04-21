module API
  module V1
    class Base < Grape::API
      error_formatter :json, API::ErrorFormatter
      mount API::V1::Users
      mount API::V1::Auth
    end
  end
end
