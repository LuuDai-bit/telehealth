class ExtendResultToSaveLongerStringInSequences < ActiveRecord::Migration[6.1]
  def change
    change_column :sequences, :result, :text
    change_column :sequences, :original_result, :text
  end
end
