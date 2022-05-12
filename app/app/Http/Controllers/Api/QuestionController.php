<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class QuestionController extends Controller
{

    public function index(){
        return response(Question::query()
                            ->with('answers')
                            ->with('survey')
                            ->get()->all());
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'question_text' => 'required',
            'survey_id' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $question = new Question($request->all());
        $question->save();

        return $question;
    }

    public function show($id){
        return response(Question::query()->with('answers')->findOrFail($id));
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'question_text' => 'required',
            'survey_id' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(),Response::HTTP_BAD_REQUEST);
        }
        $question = Question::query()->findOrFail($id);
        $question->update($request->all());

        return $question;
    }

    public function destroy($id){
        $question = Question::query()->findOrFail($id);

        DB::beginTransaction();

        try {
            $question->delete();
            DB::commit();

        } catch (\Throwable $throwable) {
            DB::rollback();
            return \response($throwable,Response::HTTP_INTERNAL_SERVER_ERROR);

        }

        return \response(['Deleted'],Response::HTTP_NO_CONTENT);

    }

}
