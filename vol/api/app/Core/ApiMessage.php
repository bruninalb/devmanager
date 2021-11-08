<?php


namespace App\Core;


class ApiMessage
{
    private string $message;
    private ?array $return;
    private ?array $returnName;
    private int $statusCode;

    public function notFound(string $searched = "Search"): \Illuminate\Http\JsonResponse
    {
        $searched = ucfirst(strtolower(trim(($searched))));
        $this->message = $searched . " not found";
        $this->statusCode = 404;
        return $this->getAll();
    }

    public function found(string $searched = null, $return = null, string $returnName = null): ?\Illuminate\Http\JsonResponse
    {
        if ($searched === null) {

            $this->message = "Your search was successful";
        } else {
            $searched = strtolower(trim(($searched)));
            $this->message = trim("Your search for {$searched} was successful");
        }
        $this->statusCode = 200;
        if(isset($return) && isset($returnName)){
            $this->setReturn($returnName, $return);
        }

        return $this->getAll();
    }

    public function registered(string $registered = null, $return = null, string $returnName = null): \Illuminate\Http\JsonResponse
    {
        $this->message = ucfirst(strtolower(trim("{$registered} successfully registered")));
        $this->statusCode = 201;
        if(isset($return) && isset($returnName)){
            $this->setReturn($returnName, $return);
        }
        return $this->getAll();
    }

    public function updated(string $updated = null, $return = null, string $returnName = null): ?\Illuminate\Http\JsonResponse
    {
        $this->message = ucfirst(strtolower(trim("{$updated} successfully updated")));
        $this->statusCode = 200;
        if(isset($return) && isset($returnName)){
            $this->setReturn($returnName, $return);
        }
        return $this->getAll();
    }

    public function deleted(string $deleted = null): ?\Illuminate\Http\JsonResponse
    {
        $this->message = ucfirst(strtolower(trim("{$deleted} successfully deleted")));
        $this->statusCode = 204;
        $this->return = null;
        $this->returnName = null;
        return $this->getAll();
    }

    public function error(string $message, $return = null, string $returnName = null): ?\Illuminate\Http\JsonResponse
    {
        $this->message = ucfirst(strtolower(trim($message)));
        $this->statusCode = 400;
        if(isset($return) && isset($returnName)){
            $this->setReturn($returnName, $return);
        }
        return $this->getAll();
    }

    public function unauthorized(string $to): ?\Illuminate\Http\JsonResponse
    {
        $this->message = ucfirst(strtolower(trim("You are unauthorized to {$to}")));
        $this->statusCode = 401;
        $this->return = null;
        $this->returnName = null;
        return $this->getAll();
    }
    public function success(string $message, $return = null, string $returnName = null): ?\Illuminate\Http\JsonResponse
    {
        $this->message = ucfirst(strtolower(trim($message)));
        $this->statusCode = 200;
        if(isset($return) && isset($returnName)){
            $this->setReturn($returnName, $return);
        }
        return $this->getAll();
    }


    public function setMessage(string $message): ApiMessage
    {
        $this->message = $message;
        return $this;
    }

    public function setStatusCode(int $statusCode): ApiMessage
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    public function setReturn(string $returnName, $return): ApiMessage
    {
        $this->$returnName = $returnName;
        $this->return[] = $return;
        $this->returnName[] = $returnName;
        return $this;
    }

    public function getAll(): \Illuminate\Http\JsonResponse
    {
        $return = [
            "message" => $this->message
        ];

        if (!empty($this->returnName)) {

            $returns = array_combine($this->returnName, $this->return);

            foreach ($returns as $name => $value) {
                $return[$name] = $value;
            }
        }

        return response()->json($return, $this->statusCode);

    }
}
