class CreatePlayers < ActiveRecord::Migration[5.0]
  def change
    create_table :players do |t|
      t.string :first_name
      t.string :last_name
      t.string :team
      t.string :position
      t.integer :att
      t.float :att_per_g
      t.integer :yds
      t.float :yds_avg
      t.float :yds_per_g
      t.integer :td
      t.string :lng
      t.integer :first
      t.float :first_percentage
      t.integer :twenty_yard_carries
      t.integer :fourty_yard_carries
      t.integer :fum

      t.timestamps
    end
  end
end
