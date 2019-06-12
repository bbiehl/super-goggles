class CreateBeers < ActiveRecord::Migration[5.2]
  def change
    create_table :beers do |t|
      t.string :name
      t.string :ibu
      t.string :abv
      t.text :description

      t.timestamps
    end
  end
end
