class CreateSequences < ActiveRecord::Migration[6.1]
  def change
    create_table :sequences do |t|
      t.string :result
      t.string :original_result, null: false
      t.datetime :start_at, null: false
      t.datetime :end_at, null: false
      t.references :video, null: false, foreign_key: true

      t.timestamps
    end
  end
end
