<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Answer;
use App\Models\Rule;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class RuleController extends Controller
{

    public function index(){
        return response(Rule::query()
                            ->with('survey')
                            ->get()->all());
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'logic' => 'required',
            'result_text' => 'required',
            'survey_id' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(), Response::HTTP_BAD_REQUEST);
        }
        $rule = new Rule($request->all());
        $rule->save();

        return $rule;
    }

    public function show($id){
        return response(Rule::query()->with('rules')->findOrFail($id));
    }

    public function update(Request $request, $id){

        $validator = Validator::make($request->all(),[
            'logic' => 'required',
            'result_text' => 'required',
            'survey_id' => 'required',
        ]);
        if ($validator->fails()){
            return \response($validator->errors(),Response::HTTP_BAD_REQUEST);
        }
        $rule = Rule::query()->findOrFail($id);
        $rule->update($request->all());

        return $rule;
    }

    public function destroy($id){
        $rule = Rule::query()->findOrFail($id);

        DB::beginTransaction();

        try {
            $rule->delete();
            DB::commit();

        } catch (\Throwable $throwable) {
            DB::rollback();
            return \response($throwable,Response::HTTP_INTERNAL_SERVER_ERROR);

        }

        return \response(['Deleted'],Response::HTTP_NO_CONTENT);

    }

}
