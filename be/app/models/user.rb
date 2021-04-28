class User < ApplicationRecord
  enum role: {admin: 0, user: 1}

  has_many :videos
end
