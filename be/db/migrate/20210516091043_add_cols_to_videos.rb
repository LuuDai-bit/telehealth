class AddColsToVideos < ActiveRecord::Migration[6.1]
  def change
    add_column :videos, :consultant, :string
    add_column :videos, :chairman, :string
    add_column :videos, :mediaFormat, :string
    add_column :videos, :duration, :string
    add_column :videos, :videoSize, :integer
    add_column :videos, :audioSize, :integer
    add_column :videos, :venue, :integer
  end
end
