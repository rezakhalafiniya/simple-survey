<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Survey;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SurveyController extends Controller
{

    public function index(){
        return response(Survey::query()
                            ->with('questions')
                            ->with('questions.answers')
                            ->get()->all());
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'slug' => 'required|unique:surveys',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $survey = new Survey($request->all());
        $survey->save();

        return $survey;
    }

    public function show($id){
        return response(Survey::query()
                            ->with('questions')
                            ->with('questions.answers')
                            ->with('rules')
                            ->findOrFail($id));
    }

    public function getResults($survey_id,$participant_id){
        $resutls = Survey::getResults($survey_id,$participant_id);
        return $resutls;
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'description' => 'required',
            'slug' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(),Response::HTTP_BAD_REQUEST);
        }
        $survey = Survey::query()->findOrFail($id);
        $survey->update($request->all());

        return $survey;
    }

    public function destroy($id){
        $survey = Survey::query()->findOrFail($id);

        DB::beginTransaction();

        try {
            $survey->delete();
            DB::commit();

        } catch (\Throwable $throwable) {
            DB::rollback();
            return \response($throwable,Response::HTTP_INTERNAL_SERVER_ERROR);

        }

        return \response(['Deleted'],Response::HTTP_NO_CONTENT);

    }

}
