# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all()
Comment.destroy_all()

100.times do
    Post.create(
        title: Faker::TvShows::Buffy.episode,
        body: Faker::Lorem.paragraph,
        created_at: Faker::Date.backward(days:365 * 5),
        updated_at: Faker::Date.backward(days:365 * 5)
    )
end

200.times do
    Comment.create(
        body: Faker::TvShows::Buffy.quote,
        created_at: Faker::Date.backward(days:365 * 5),
        post_id: Faker::Number.between(from: 1, to: 100)
    )
end

puts Cowsay.say("Generated #{Post.count} posts and #{Comment.count} comments", :dragon)