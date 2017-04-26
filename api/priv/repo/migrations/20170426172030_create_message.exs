defmodule Sling.Repo.Migrations.CreateMessage do
  use Ecto.Migration

  def change do
    create table(:message) do
      add :text, :string, null: false
      add :room_id, references(:rooms, on_delete: :nothing), null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end
    create index(:message, [:room_id])
    create index(:message, [:user_id])

  end
end
