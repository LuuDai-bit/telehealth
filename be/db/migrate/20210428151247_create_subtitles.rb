class CreateSubtitles < ActiveRecord::Migration[6.1]
  def change
    create_table :subtitles do |t|
      t.string :file_name, null: false
      t.datetime :deleted_at
      t.references :video, null: false, foreign_key: true

      t.timestamps
    end
  end
end
