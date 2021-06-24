class DropSubtitles < ActiveRecord::Migration[6.1]
  def change
    drop_table :subtitles
  end
end
