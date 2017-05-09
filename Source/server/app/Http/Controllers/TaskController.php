<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\History;
use App\Task;
use Illuminate\Support\Facades\Log;

class TaskController extends Controller
{
    /**
     * Checking update
     *
     * @param Illuminate\Http\Request $request The request values
     * @return void
     */
    public function checking(Request $request)
    {
        $sync_time = $request->input('sync_time');
        
        // query builder
        $query = History::query();
        // get all available sync time
        $query = $query->where('sync_time', '>=', $sync_time);

        // if is synced
        if ($query->count() == 0) {
            return response()->json([
                'status' => true
            ]);
        }

        // return result for syncing
        $result = [];
        $histories = $query->get();

        // get all change
        foreach ($histories as $history) {
            $content = json_decode($history->content);
            $result = array_merge($result, $content);
            $sync_time = $history->sync_time;
        }

        return response()->json([
            'status' => false,
            'sync_time' => $sync_time,
            'result' => json_encode($result)
        ]);
    }

    /**
     * Sync 
     *
     * @param Illuminate\Http\Request $request The request values
     * @return void
     */
    public function sync(Request $request)
    {
        $content = json_decode($request->content);

        // save tasks
        foreach ($content as $params) {
            $task = Task::firstOrNew(['id' => $params->id]);
            if (isset($params->name)) {
                $task->name = $params->name;
            }
            if (isset($params->project)) {
                $task->project = $params->project;
            }
            if (isset($params->priority)) {
                $task->priority = $params->priority;
            }
            if (isset($params->deadline)) {
                $task->deadline = $params->deadline;
            }
            if (isset($params->status)) {
                $task->status = $params->status;
            }
            if (isset($params->completed_date)) {
                $task->completed_date = $params->completed_date;
            }
            if (isset($params->started_date)) {
                $task->started_date = $params->started_date;
            }
            
            $task->save();
        }

        // save histories
        $history = new History();
        $history->sync_time = new \DateTime();
        $history->content = json_encode($content);
        $history->save();

        // query builder
        return response()->json([
            'status' => true,
            'sync_time' => $history->sync_time
        ]);
    }
}
