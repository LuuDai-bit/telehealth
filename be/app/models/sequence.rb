class Sequence < ApplicationRecord
  searchkick highlight: [:result]

  belongs_to :video
end
