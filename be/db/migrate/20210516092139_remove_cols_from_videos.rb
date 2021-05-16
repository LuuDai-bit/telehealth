class RemoveColsFromVideos < ActiveRecord::Migration[6.1]
  def change
    remove_column :videos, :length, :string
    remove_column :videos, :file_name, :string
  end
end
