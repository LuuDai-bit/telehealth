class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :user_name, null: false
      t.string :name
      t.string :mobile
      t.string :password_digest
      t.integer :role, null: false
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
