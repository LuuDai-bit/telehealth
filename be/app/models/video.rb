class Video < ApplicationRecord
  has_many :sequences
  has_many :subtitles
  has_many :categories
  belongs_to :user
end
