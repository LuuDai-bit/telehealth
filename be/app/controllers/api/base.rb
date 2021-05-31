module API
  class Base < Grape::API
    error_formatter :json, API::ErrorFormatter
    mount API::V1::Auth
    mount API::V1::Users
    mount API::V1::Videos
    mount API::V1::Categories
  end
end
