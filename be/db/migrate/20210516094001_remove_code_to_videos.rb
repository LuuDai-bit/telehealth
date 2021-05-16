class RemoveCodeToVideos < ActiveRecord::Migration[6.1]
  def change
    add_column :videos, :code, :string
  end
end
