<?php

namespace App\Http\Controllers;

use App\Core\ApiMessage;
use App\Core\RequestValidate;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Validation\Rule;

class DeveloperController extends Controller
{
    public function store(Request $request)
    {
        $fieldsAllowed = [
            "name" => ["required", "min:2", "max:145"],
            "gender" => ["required", Rule::in(['M', 'F'])],
            "birth_date" => ["required", "date"],
            "hobby" => ["required", "min:2", "max:45"],
        ];

        $requestValidate = (new RequestValidate($request->all(), $fieldsAllowed));
        if ($requestValidate->getError()) {
            return (new ApiMessage())->error($requestValidate->getError());
        }

        $developer = new \App\Models\Developer;

        foreach ($request->all() as $field => $value) {
            $developer->$field = $value;
        }

        $birthDate = new DateTime($request->birth_date);

        $developer->age = floor((now()->getTimestamp() - $birthDate->getTimestamp()) / (365 * 60 * 60 * 24));

        $developer->save();

        return (new ApiMessage())->registered("Developer", $developer->toArray(), "developer");

    }

    public function update(Request $request, int $developerId)
    {
        $fieldsAllowed = [
            "name" => ["nullable", "min:2", "max:145"],
            "gender" => ["nullable", Rule::in(['M', 'F'])],
            "birth_date" => ["nullable", "date"],
            "hobby" => ["nullable", "min:2", "max:45"],
        ];

        $requestValidate = (new RequestValidate($request->all(), $fieldsAllowed));
        if ($requestValidate->getError()) {
            return (new ApiMessage())->error($requestValidate->getError());
        }

        $developer = \App\Models\Developer::find($developerId);

        if (!$developer) {
            return (new ApiMessage())->error("Not found this developer");
        }

        foreach ($request->all() as $field => $value) {
            $developer->$field = $value;
        }

        $birthDate = new DateTime($request->birth_date);

        $developer->age = floor((now()->getTimestamp() - $birthDate->getTimestamp()) / (365 * 60 * 60 * 24));
        $developer->updated_at = now();
        $developer->save();

        return (new ApiMessage())->updated("Developer", $developer->toArray(), "developer");

    }

    public function delete(int $developerId)
    {
        $developer = \App\Models\Developer::find($developerId);

        if (!$developer) {
            return (new ApiMessage())->error("Not found this developer");
        }

        $developer->delete();

        return (new ApiMessage())->deleted("Developer");
    }

    public function showById(int $developerId)
    {
        $developer = \App\Models\Developer::find($developerId);

        if (!$developer) {
            return (new ApiMessage())->error("Not found this developer");
        }

        return (new ApiMessage())->found("Developer", $developer->toArray(), "developer");
    }

    public function showAll(Request $request)
    {
        $fieldsAllowed = [
            "name" => ["nullable", "min:2", "max:145"],
            "gender" => ["nullable", Rule::in(['M', 'F'])],
            "minAge" => ["nullable", "integer"],
            "maxAge" => ["nullable", "integer"],
            "hobby" => ["nullable", "min:2", "max:45"],
            "page" => ["nullable", "integer"]
        ];

        $requestValidate = (new RequestValidate($request->all(), $fieldsAllowed));
        if ($requestValidate->getError()) {
            return (new ApiMessage())->error($requestValidate->getError());
        }

        $developers = \App\Models\Developer::where(function ($query) use ($request) {

            if($request->name && $request->hobby){
                $query->where(function ($query) use ($request) {
                    $query->orWhere("name", "LIKE", "%" . $request->name . "%");
                    $query->orWhere("hobby", "LIKE", "%" . $request->hobby . "%");
                });
            }

            foreach ($request->all() as $field => $value){

                if($field === "page"){
                    continue;
                }
                if($field === "minAge"){
                    $dateMin = date('Y-m-d', strtotime("-{$value} years"));
                    $query->where("birth_date", "<=" , $dateMin);
                }
                if($field === "maxAge"){
                    $dateMax = date('Y-m-d', strtotime("-{$value} years"));
                    $query->where("birth_date", ">=" , $dateMax);
                }
                if($field === "gender"){
                    $query->where("gender", $value);
                }
            }

        })->orderBy("created_at","DESC");

        if($developers->get()->count() < 1){
            return (new ApiMessage())->notFound("Developers");
        }

        return $developers->paginate();

    }
}
