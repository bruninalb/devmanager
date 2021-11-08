<?php


namespace App\Core;


use Illuminate\Support\Facades\Validator;
use App\Core\ApiMessage;

/**
 * Class RequestValidate
 * @package App\Core
 */
class RequestValidate
{
    /**
     * @var \Illuminate\Contracts\Validation\Validator
     */
    private \Illuminate\Contracts\Validation\Validator $validator;
    /**
     * @var array
     */
    private array $request;
    /**
     * @var array
     */
    private array $fields;

    /**
     * RequestValidate constructor.
     * @param array $request
     * @param array $fields
     */
    public function __construct(array $request, array $fields )
    {

        $this->validator = Validator::make($request, $fields);
        $this->request = $request;
        $this->fields = $fields;
        return $this;
    }

    /**
     * @return array|null
     */
    public function getNotAllowed(): ?array
    {

        $fieldsNotAllowed = [];

        foreach ($this->request as $field => $value){
            if(!array_key_exists($field, $this->fields)){
                $fieldsNotAllowed[] = $field;
            }
        }
        if(!empty($fieldsNotAllowed)){
            return $fieldsNotAllowed;
        }
        return null;

    }

    /**
     * @return string|null
     */
    public function getError(): ?string
    {

        if(!empty($this->getNotAllowed())){

            $return = "Fields not allowed: ";
            foreach ($this->getNotAllowed() as $field){
                $return .= $field." ";
            }

            return $return;
        }

        if ($this->validator->fails()) {
            $return = "";
            foreach($this->validator->errors()->getMessages() as $field => $message){
                $return .= "{$message[0]}";
                return $return;
            }
        }

        return null;
    }

    /**
     * @return \Illuminate\Contracts\Validation\Validator
     */
    public function getValidator(): \Illuminate\Contracts\Validation\Validator
    {
        return $this->validator;
    }
}
