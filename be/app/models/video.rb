class Video < ApplicationRecord
  searchkick searchable: [:duration, :created_at]

  has_many :sequences
  has_many :subtitles
  has_many :categories
  belongs_to :user

  scope :with_ids, (lambda do |ids|
    where id: ids if ids
  end)

  scope :with_duration, (lambda do |min_duration, max_duration| 
    return if min_duration.blank? || max_duration.blank?

    where "duration > ? AND duration < ?", min_duration, max_duration
  end)

  scope :with_created_at, (lambda do |created_at_start, created_at_end|
    return if created_at_start.blank? || created_at_end.blank?

    where created_at: created_at_start..created_at_end
  end)
end
