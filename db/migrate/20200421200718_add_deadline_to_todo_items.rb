class AddDeadlineToTodoItems < ActiveRecord::Migration[6.0]
  def change
    add_column :todo_items, :deadline, :datetime
  end
end
