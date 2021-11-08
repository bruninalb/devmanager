<?php

use App\Http\Controllers\DeveloperController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix("developers")->name("developers")->group(function (){
    Route::post("/", [DeveloperController::class, "store"])->name("store");
    Route::get("/", [DeveloperController::class, "showAll"])->name("show.all");
    Route::get("/{id}", [DeveloperController::class, "showById"])->name("show.by.id");
    Route::put("/{id}", [DeveloperController::class, "update"])->name("update");
    Route::delete("/{id}", [DeveloperController::class, "delete"])->name("delete");
});
