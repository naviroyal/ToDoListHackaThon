/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * App Component
 */
import React from 'react';
import './App.css';
import addIcon from './assets/plus-icon.svg';
import { NewEntrySheet, IEntry } from './components/NewEntrySheet';
import { TaskList } from './components/TaskList';
import { storageKey } from './constants/constants';
import { get } from 'https';

const App = () => {
    const [isEntrySheetOpen, setIsEntrySheetOpen] = React.useState(false);
    
    

    const openEntrySheet = () => {
        setIsEntrySheetOpen(true);
    };

    const closeEntrySheet = () => {
        setIsEntrySheetOpen(false);
    };

    const onAddEntry = (entry) => {
        const existingTasksString = window.localStorage.getItem(storageKey);
        if (existingTasksString) {
            const existingTasks = JSON.parse(existingTasksString);
            const newTasks = [...existingTasks, entry];
             window.localStorage.setItem(storageKey, JSON.stringify(newTasks));
        } else {
             window.localStorage.setItem(storageKey, JSON.stringify([entry]));
        }
        closeEntrySheet();
        
    };

    const getTaskEntries = () => {
        const entriesString = window.localStorage.getItem(storageKey);
        const entries = entriesString ? JSON.parse(entriesString) : [];
        return entries;
    };

    let index;
    
    const closeEntryCard = (id) => {
        let tasks=localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')||'{}') : [];
        //Crossicon is working by refreshing the page or addding new stylesheet but by clicking on cross icon its value from local storage gets deleted
        entries=task;
        for(let i=0;i<tasks.length;i++)
        {
           if(tasks[i].id===id){
                index=i;
                tasks.splice(index,1);
                break;
           }
        }
       // if(index === undefined) return 
       setTask(tasks);
    //    if(checkit==true)
    //    {
    //     setCheckIt(false);
    //     setPrevCheckIt(true);
    //    }
    //    else{
    //     setCheckIt(true);
    //     setPrevCheckIt(false);
    //    }
        localStorage.setItem('tasks',JSON.stringify(tasks));
        getTaskEntries();
    }

    let entries = getTaskEntries();
    const [task,setTask]=React.useState(entries);
    let styles;
    let i=0,hour=0,minutes=0,totaltime=0;
    for(i=0;i<entries.length;i = i + 1)
    {
        hour = hour + entries[i].hours * 60;
        minutes = minutes + entries[i].minutes * 1;
    }
    totaltime = hour + minutes;
    if( totaltime>0 && totaltime < 240)
     {
         let w=totaltime/480;
        styles={backgroundColor:'red',width:`calc(100%* ${w})`, height: '.5em',borderRadius: '4px'}
     }
     else if(totaltime >= 240 && totaltime < 480) 
     {
        let w=totaltime/480;
         styles={backgroundColor:'orange',width:`calc(100%* ${w})`, height: '.5em',borderRadius: '4px'}
     } 
     else if(totaltime>=480) 
     {
         styles={backgroundColor:'rgb(35,174,24)',width:'100%', height: '.5em',borderRadius: '4px'}
     }
     else 
     {
         styles={backgroundColor:'#a0a4a8', height: '.5em',borderRadius: '4px'}
     }
     
     return (
        <div className="app-container">
            <h1>To-do List</h1>
            <section className="progress-container" >
                <div style={styles}></div>
            </section>
            {entries.length > 0 ? (
                <TaskList entries={entries} cardClose={(id)=>closeEntryCard(id)}/>
            ) : (
                <p className="empty-text">No entries yet. Add a new entry by clicking the + button.</p>
            )}
            <button className="floating-add-entry-btn" onClick={openEntrySheet}>
                <img className="add-icon" src={addIcon} alt="add entry" />
            </button>
            {isEntrySheetOpen && <NewEntrySheet onClose={closeEntrySheet} onAdd={onAddEntry} />}
        </div>
    );
};

export default App;
