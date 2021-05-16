class ChangeStartEndAtOnSequence < ActiveRecord::Migration[6.1]
  def change
    change_column :sequences, :start_at, :string
    change_column :sequences, :end_at, :string
  end
end
