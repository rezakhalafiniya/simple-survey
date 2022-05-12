<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
                'password' => 'required',
            ]
        );
        if ($validator->fails()) {
            return \response($validator->errors(), Response::HTTP_BAD_REQUEST);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response(['credential check failed'], Response::HTTP_UNAUTHORIZED);
        }
        $token = $user->createToken($user->email)->plainTextToken;

        return \response(['user' => $user, 'token' => $token]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|unique:users|email',
                'password' => 'required',
                'name' => 'required',
            ]
        );
        if ($validator->fails()) {
            return \response($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        try{
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();
            $token = $user->createToken($user->email)->plainTextToken;
        }catch (QueryException $exception){
            return \response(['message' => 'User not created'], Response::HTTP_BAD_REQUEST);
        }
        return \response(['user' => $user, 'token' => $token]);
    }

}
