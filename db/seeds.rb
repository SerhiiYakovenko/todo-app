# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

2.times do |i|
  User.create(email: "user-#{i}@test.com",
              password: 'password',
              password_confirmation: 'password')
end

User.all.each do |user|
  10.times do |i|
    user.todo_items.create(title: "To Do Item #{i + 1} for #{user.email}",
                           complete: (i % 3).zero?,
                           deadline: DateTime.now)
  end
end
