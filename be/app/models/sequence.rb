class Sequence < ApplicationRecord
  searchkick highlight: [:result], searchable: [:result]

  belongs_to :video

  def search_data 
    {
      result: result
    }
  end
end
