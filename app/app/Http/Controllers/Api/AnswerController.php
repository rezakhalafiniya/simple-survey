<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Answer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AnswerController extends Controller
{

    public function index(){
        return response(Answer::query()->with('question')->get()->all());
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'answer_text' => 'required',
            'value' => 'required',
            'question_id' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $answer = new Answer($request->all());
        $answer->save();

        return $answer;
    }

    public function show($id){
        return response(Answer::query()->with('results')->findOrFail($id));
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'answer_text' => 'required',
            'value' => 'required',
            'question_id' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(),Response::HTTP_BAD_REQUEST);
        }
        $answer = Answer::query()->findOrFail($id);
        $answer->update($request->all());

        return $answer;
    }

    public function destroy($id){
        $answer = Answer::query()->findOrFail($id);

        DB::beginTransaction();

        try {
            $answer->delete();
            DB::commit();

        } catch (\Throwable $throwable) {
            DB::rollback();
            return \response($throwable,Response::HTTP_INTERNAL_SERVER_ERROR);

        }

        return \response(['Deleted'],Response::HTTP_LOOP_DETECTED);

    }

}
