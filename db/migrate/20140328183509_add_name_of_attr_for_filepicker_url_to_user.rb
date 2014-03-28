class AddNameOfAttrForFilepickerUrlToUser < ActiveRecord::Migration
  class AddNameOfAttrForFilepickerUrlToUser < ActiveRecord::Migration
      def up
          add_column :story, :filepicker_url, :string
      end

      def down
          remove_column :story, :filepicker_url
      end
  end  
end