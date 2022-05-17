<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Participant;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ParticipantController extends Controller
{

    public function index(){
        return response(Participant::query()
                            ->with('results')
                            ->with('results.answer')
                            ->get()->all());
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'nickname' => 'required|unique:participants',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $participant = new Participant($request->all());
        $participant->save();

        return $participant;
    }

    public function show($id){
        return response(Participant::query()->with('results')->findOrFail($id));
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'nickname' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(),Response::HTTP_BAD_REQUEST);
        }
        $participant = Participant::query()->findOrFail($id);
        $participant->update($request->all());

        return $participant;
    }

    public function destroy($id){
        $participant = Participant::query()->findOrFail($id);

        DB::beginTransaction();

        try {
            $participant->delete();
            DB::commit();

        } catch (\Throwable $throwable) {
            DB::rollback();
            return \response($throwable,Response::HTTP_INTERNAL_SERVER_ERROR);

        }

        return \response(['Deleted'],Response::HTTP_NO_CONTENT);

    }

}
