<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Twilio\Jwt\AccessToken;
use Illuminate\Http\Request;
use Twilio\Jwt\Grants\ChatGrant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\AuthenticationException;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'api_token' => Str::random(60),
            'role' => 'user'
        ]);

        if ($user) {
            return response()->json(
                ['message'=>'Successfully created user!'],
                201
            );
        }

        return response()->json(['message'=>'Internal Server Error'], 500);
    }

    /**
     * Login user and create token
     *
     */
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials)) {
            throw new AuthenticationException('Login details not valid');
        }

        $user = $request->user();

        $token = $this->generate($user);

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }


    private function generate(User $user)
    {
        $token = new AccessToken(
            env('TWILIO_AUTH_SID'),
            env('TWILIO_API_SID'),
            env('TWILIO_API_SECRET'),
            3600,
            $user->email
        );

        $chatGrant = new ChatGrant();
        $chatGrant->setServiceSid(env('TWILIO_SERVICE_SID'));
        $token->addGrant($chatGrant);
        return $token->toJWT();
    }

    public function users(Request $request)
    {
        return response()->json([
            'message' => 'All users',
            'users' => User::where('id', '<>', auth()->user()->id)->where('role', '<>', 'admin')->get()
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    // public function logout(Request $request)
    // {
    //     if (auth()->user()->token()->revoke() && auth()->user()->token()->delete()) {
    //         Log::info('User with id: ' . $request->user()->id . ' logout in successfully');
    //         return $this->response('Successfully logged out', 200);
    //     }
    //     Log::debug('User with id: ' . $request->user()->id . ' could not logout, Internal Server Error');
    //     return $this->response('Internal Server Error, User not logged out', 500);
    // }
}
