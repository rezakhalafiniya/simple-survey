<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Result;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ResultController extends Controller
{

    public function index(){
        return response(Result::query()
                            ->with('question')
                            ->with('question')
                            ->with('participant')
                            ->with('survey')
                            ->get()->all());
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'answer_id' => 'required',
            'question_id' => 'required',
            'survey_id' => 'required',
            'participant_id' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $result = new Result($request->all());
        $result->save();

        return $result;
    }

    public function show($id){
        return response(Answer::query()->with('results')->findOrFail($id));
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'answer_id' => 'required',
            'question_id' => 'required',
            'survey_id' => 'required',
            'participant_id' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(),Response::HTTP_BAD_REQUEST);
        }
        $result = Result::query()->findOrFail($id);
        $result->update($request->all());

        return $result;
    }

    public function destroy($id){
        $result = Result::query()->findOrFail($id);

        DB::beginTransaction();

        try {
            $result->delete();
            DB::commit();

        } catch (\Throwable $throwable) {
            DB::rollback();
            return \response($throwable,Response::HTTP_INTERNAL_SERVER_ERROR);

        }

        return \response(['Deleted'],Response::HTTP_LOOP_DETECTED);

    }

}
