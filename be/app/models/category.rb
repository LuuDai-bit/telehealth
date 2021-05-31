class Category < ApplicationRecord
  has_many :video_categories, dependent: :destroy
  has_many :videos,
    through: :video_categories,
    dependent: :destroy
end
