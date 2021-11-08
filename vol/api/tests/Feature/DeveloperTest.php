<?php

namespace Tests\Feature;

use Database\Factories\DeveloperFactory;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeveloperTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */

    public function test_developer_can_register()
    {
        $response = $this->postJson('/api/developers', [
            "name" => "Bruno Albuquerque",
            "gender" => "M",
            "hobby" => "loren ipsum dolor",
            "birth_date" => "1996-09-13",
        ]);

        $response->assertStatus(201);
    }
    public function test_developer_can_delete()
    {
        $developer = (new DeveloperFactory())->create();

        $response = $this->deleteJson('/api/developers/'.$developer->id);

        $response->assertStatus(204);
    }

    public function test_developer_can_show_all()
    {
        (new DeveloperFactory())->count(2)->create();

        $response = $this->getJson('/api/developers?page=1');
        $response->assertStatus(200);
    }
    public function test_developer_can_show_by_id()
    {
        $developer = (new DeveloperFactory())->create();

        $response = $this->getJson('/api/developers/'. $developer->id);
        $response->assertStatus(200);
    }
    public function test_developer_can_update()
    {
        $developer = (new DeveloperFactory())->create();
        $response = $this->putJson('/api/developers/'. $developer->id, [
            "name" => "Jorge Estevam",
            "gender" => "M",
            "hobby" => "loren ipsum dolor",
            "birth_date" => "1996-09-13",
        ]);

        $response->assertStatus(200);
    }
}
