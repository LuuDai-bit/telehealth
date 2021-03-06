# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_16_110409) do

  create_table "categories", charset: "utf8", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "sequences", charset: "utf8", force: :cascade do |t|
    t.text "result"
    t.text "original_result", null: false
    t.string "start_at", null: false
    t.string "end_at", null: false
    t.bigint "video_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["video_id"], name: "index_sequences_on_video_id"
  end

  create_table "subtitles", charset: "utf8", force: :cascade do |t|
    t.string "file_name", null: false
    t.datetime "deleted_at"
    t.bigint "video_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["video_id"], name: "index_subtitles_on_video_id"
  end

  create_table "users", charset: "utf8", force: :cascade do |t|
    t.string "email", null: false
    t.string "user_name", null: false
    t.string "name"
    t.string "mobile"
    t.integer "role", default: 1, null: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "video_categories", charset: "utf8", force: :cascade do |t|
    t.bigint "video_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["category_id"], name: "index_video_categories_on_category_id"
    t.index ["video_id"], name: "index_video_categories_on_video_id"
  end

  create_table "videos", charset: "utf8", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "deleted_at"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "consultant"
    t.string "chairman"
    t.string "mediaFormat"
    t.string "duration"
    t.integer "videoSize"
    t.integer "audioSize"
    t.integer "venue"
    t.string "code"
    t.index ["user_id"], name: "index_videos_on_user_id"
  end

  add_foreign_key "sequences", "videos"
  add_foreign_key "subtitles", "videos"
  add_foreign_key "video_categories", "categories"
  add_foreign_key "video_categories", "videos"
  add_foreign_key "videos", "users"
end
