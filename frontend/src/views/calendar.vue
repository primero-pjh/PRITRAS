<template>
    <div id="calendarVue" class="shadow-2" style="margin: -16px;">
        <div class="row items-center q-pa-md bg-white w100p">
            <div class="q-mr-md">
                <q-btn-group>
                    <q-btn dense style="width: 50px;" label="월" class="faSB"
                        :color="(view_type=='month')?'primary':'white'"
                        :text-color="(view_type=='month')?'white':'black'" 
                        @click="changeViewType('month')" />
                    <q-btn dense style="width: 50px;" label="주" class="faSB"
                        :color="(view_type=='week')?'primary':''" 
                        :text-color="(view_type=='week')?'white':'black'" 
                        @click="changeViewType('week')" />
                    <q-btn dense style="width: 50px;" label="일" class="faSB"
                        :color="(view_type=='day')?'primary':''" 
                        :text-color="(view_type=='day')?'white':'black'" 
                        @click="changeViewType('day')" />
                </q-btn-group>
            </div>
            <div class="row">
                <div class="q-mr-md">
                    <q-btn dense icon="chevron_left" outline @click="move_date(-1)" />
                </div>
                <div class="q-mr-md">
                    <div class="faSB text-h5 q-px-md">{{ standard_date }}</div>
                </div>
                <div class="q-mr-md">
                    <q-btn dense icon="chevron_right" outline @click="move_date(1)" />
                </div>
                <div>
                    <q-btn dense label="오늘" outline color="primary" class="faSB" 
                        style="width: 50px;"
                        @click="move_date(0)" />
                </div>
            </div>
            <q-space />
            <div>
                <q-btn icon="filter_alt" color="black" dense 
                    @click="onWindowCalendar"
                    outline><q-tooltip>캘린더 필터</q-tooltip>
                </q-btn>
            </div>
        </div>
        <!-- <q-separator></q-separator> -->

        <div class="bg-white">
            <div id="calendar" style="height: 600px; border: 1px solid #eee;"></div>
        </div>

        <!-- <com_calendar_filter ref="com_calendar_filter" /> -->
        <!-- <com_winbox ref="com_winbox" /> -->
        <template v-if="!isDisabled">
            <div>안녕?</div>
            <teleport to="#calendar_filter .wb-body">
                <com_calendar_filter ref="com_calendar_filter" />
            </teleport>
        </template>
    </div>
</template>

<script>

import axios from "axios";
import Calendar from '@toast-ui/calendar';
import com_calendar_filter from '@/components/calendar/com_calendar_filter';
// import com_winbox from '@/components/com_winbox';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
export default {
    name: 'calendarVue',
    components: {
        com_calendar_filter,
        // com_winbox
    },
    computed: {
    },
    data() {
        return {
            options:  {
            title: 'Current count: 0',
            class: 'modern',
            },
            view_type: 'month', 
            standard_date: '',
            is_check: false,
            calendar: null,
            schedule_list: [],

            classification: {
                title: '',
                color: '',
            },
            formError: {
                title: '',
            },

            isDisabled: true,
        }
    },
    methods: {
        /* classification */
        onAddClassification() {
            let vm = this;
            vm.$q.loading.show();
            let coupleInfoId = vm.$store.state.user.coupleInfoId;
            vm.$store.state.clearError(vm.formError);
            axios.post(`/api/couple/${coupleInfoId}/schedules-classifications`, {
                title: vm.classification.title,
                color: vm.classification.color,
            }).then((res) => {
                let data = res.data;
                if(data.success) {
                    vm.$q.notify({
                        icon: 'check',
                        color: 'positive',
                        message: data.message,
                    });
                    vm.loadScheduleClassificationList();
                } else {
                    if(Object.prototype.hasOwnProperty.call(data, "error") == true) {
                        vm.$store.state.setError(vm.formError, data.error);
                    }
                    if(Object.prototype.hasOwnProperty.call(data, "message") == true) {
                        vm.$q.notify({
                            icon: 'error',
                            color: 'negative',
                            message: data.message,
                        });
                    }
                }
                vm.$q.loading.hide();
            });
        },  
        onDeleteClassification(row) {
            let vm = this;
            let coupleInfoId = vm.$store.state.user.coupleInfoId;
            let coupleScheduleClassificationId = row.coupleScheduleClassificationId;
            axios.delete(`/api/couple/${coupleInfoId}/schedules-classifications/${coupleScheduleClassificationId}`).then((res) => {
                let data = res.data;
                if(data.success) {
                    vm.$q.notify({
                        icon: 'check',
                        color: 'positive',
                        message: data.message,
                    });
                    vm.loadScheduleClassificationList();
                } else {
                    vm.$q.notify({
                        icon: 'close',
                        color: 'negative',
                        message: data.message,
                    });
                }
            });
        },  

        /* select */
        selectClassification(row) {
            let vm = this;
            row.isSelected = !row.isSelected;
            vm.calendar.setCalendarVisibility(String(row.coupleScheduleClassificationId), row.isSelected);
        },  
        /* change */
        changeViewType(view_type) {
            let vm = this;
            vm.view_type = view_type;
            vm.calendar.changeView(view_type);
        },  

        /* function */
        move_date(num) {
            let vm = this;
            if(num == -1) {
                vm.calendar.prev();
            } else if (num == 0) {
                vm.calendar.today();
            } else if (num == 1) {
                vm.calendar.next();
            }
            let date = vm.$c.formatDate(vm.calendar.getDate(), "date");
            vm.standard_date = date.slice(0, 7);
        },

        /* load */
        loadScheduleList() {
            let vm = this;
            vm.$q.loading.show();

            let uid = vm.$store.state.account.uid
            axios.get(`/api/schedule/user/${uid}`, {

            }).then((res) => {
                let response = res.data;
                if(response.status === 200) {
                    let row = response.data;

                    vm.schedule_list = [];
                    row.map((x) => {
                        let schedule = {};
                        schedule["id"] = x.id;
                        schedule["uid"] = x.uid;
                        schedule["calendarId"] = x.calendar_id;
                        schedule["title"] = x.title;
                        schedule["body"] = x.body;
                        schedule["isAllday"] = (x.is_allday) ? true : false;
                        schedule["start"] = x.start;
                        schedule["end"] = x.end;
                        schedule["location"] = x.location;
                        schedule["attendees"] = JSON.parse(x.attendees);
                        schedule["category"] = x.category;
                        schedule["classification"] = x.classification;
                        schedule["dueDateClass"] = x.due_date_class;
                        schedule["isVisible"] = x.is_visible;
                        schedule["isPending"] = x.is_pending;
                        schedule["isFocused"] = x.is_focused;
                        schedule["isPrivate"] = x.is_private;
                        schedule["status"] = x.status;
                        schedule["dateAdded"] = x.date_added;
                        schedule["dateDeleted"] = x.date_deleted;
                        vm.schedule_list.push(schedule);
                    });

                    vm.calendar.createEvents(vm.schedule_list);
                }
                vm.$q.loading.hide();
            }).catch((err) => {
                vm.$q.loading.hide();
            });
            vm.calendar.render();
            vm.calendar.clearGridSelections();
        },

        onWindowCalendar() {
            let vm = this;
            let winbox = window.$winbox.create({
                id: 'calendar_filter',
                title: '캘린더 필터',
                html: '',

                oncreate: function() {
                    console.log("oncreate");
                    vm.isDisabled = false;
                    console.log("isDisabled:", vm.isDisabled);
                },
                onclose: function() {
                    console.log("onclose");
                    vm.isDisabled = true;
                    console.log("isDisabled:", vm.isDisabled);
                },
            });
        },
    },
    mounted: function() {
        let vm = this;
        let date = new Date();
        vm.standard_date = window.$c.formatDate(new Date(), "YYYY-MM");
        const calendar = new Calendar('#calendar', {
            defaultView: 'month',
            isReadOnly: false,
            useDetailPopup: false,
            usageStatistics: false,
            useFormPopup: false,
            // gridSelection: false,
        });
        calendar.clearGridSelections();    
        // 특정 날짜 혹은 시간을 드래그 앤 드랍했을 때 발생
        calendar.on('selectDateTime', (info) => {
            let schedule = {
                id: 0,                          //	일정 ID
                calendarId: '100011',           // 캘린더 ID
                title: '',                      // 일정 제목
                body: '',                       // 일정 내용
                isAllday: false,                // 종일 일정 여부
                start: info.start,              // 일정이 시작하는 일시.
                end: info.end,                  // 일정이 끝나는 일시
                location: '',                   // 일정 장소
                attendees: [],                  // 일정 참석자 목록
                category: 'time',               // 일정 카테고리. milestone, task, allday, time 중 하나이다.
                dueDateClass: '',               // task 일정 카테고리. 어떤 문자열도 가능하다.
                isVisible: true,                // 일정 표시 여부
                isPending: false,	            // 미정인 일정 여부
                isFocused: false,	            // 일정 강조 여부
                isReadOnly: false,	            // 수정 가능한 일정 여부
                isPrivate: false,	            // 개인적인 일정 여부
                color:	'#000',	                // 일정 요소의 텍스트 색상
                backgroundColor: '#C10015',	    // 일정 요소의 배경 색상
                dragBackgroundColor: '#C10015',	// 일정 요소를 드래그했을 때 배경 색상
                borderColor:	'#000',     	// 일정 요소의 좌측 테두리 색상
                classification: '기념일',       // 일정의 분류(필터)
                // customStyle:	{},	            // 일정 요소에 적용할 스타일. CSS 카멜케이스 프로퍼티를 가진 자바스크립트 객체이다.
                // raw:	null,	                // 실제 일정 데이터
            };

            console.log("info:", info);
            vm.$root.$refs.dialog_schedule.open({
                mode: 'add',
                schedule: schedule,
            }, (scheduleData) => {
                console.log("scheduleData:", scheduleData);
                if(scheduleData) {
                    vm.schedule_list.push(scheduleData);
                    vm.calendar.createEvents([scheduleData]);  // 한개 이상의 캘린더 이벤트를 생성한다.
                }
                // 현재 캘린더에 표시된 모든 날짜/시간 선택 엘리먼트를 제거한다
                vm.calendar.clearGridSelections();    
            });
        });

        // 기본 일정 생성/수정 팝업에서 저장(Save) 버튼을 누르거나 이벤트를 드래그 앤 드랍했을 때 발생
        calendar.on('beforeUpdateEvent', ( { event, changes }) => {
            // vm.$q.loading.show();
            const { id, calendarId } = event;
            // console.log(event, changes);
            console.log("changes.end:", changes.end);
            let end = window.$c.formatDate(changes.end, "YYYY-MM-DD HH:mm:ss");
            let schedule = vm.$c.tempObj(event);
            let scheduleId = event.id;
            schedule["classification"] = vm.classification_id_dict[event.calendarId].title;
            // drag
            if(Object.keys(changes).length == 1) {
                let start = vm.$c.formatDate(event.start);
                schedule.start = start;
                schedule.end = end;
            } else {
                let start = vm.$c.formatDate(changes.start);
                schedule.start = start;
                schedule.end = end;
            }
            axios.put(`/api/schedules/${scheduleId}`, {
                schedule,
            }).then((res) => {
                let data = res.data;
                if(data.success) {
                    vm.$q.notify({
                        icon: 'check',
                        color: 'positive',
                        message: data.message
                    });
                } else {
                    if(Object.prototype.hasOwnProperty.call(data, "error") == true) {
                        vm.$store.setError(vm.formError, data.error);
                    }
                    if(Object.prototype.hasOwnProperty.call(data, "message") == true) {
                        vm.$q.notify({
                            icon: 'close',
                            color: 'negative',
                            message: data.message
                        });
                    }
                }
                vm.$q.loading.hide();
            });
            vm.calendar.updateEvent(event.id, event.calendarId, changes);
        });
        
        // 이벤트를 클릭할 때 발생
        calendar.on('clickEvent', ({ event }) => {
            const { id, calendarId } = event;
            console.log("clickEvent:", event);
            let temp = vm.schedule_list.find(x=>x.id == id);
            if(temp && temp.classification) {
                event["classification"] = temp.classification;
            }
            event["prevCalendarId"] = event.calendarId;

            vm.$root.$refs.dialog_schedule.open({
                mode: 'edit',
                schedule: event,
            }, (schedule, type) => {
                if(schedule && schedule.classification) {
                    schedule["backgroundColor"] = vm.classification_dict[schedule.classification].color;
                    schedule["dragBackgroundColor"] = vm.classification_dict[schedule.classification].color;
                }
                if(type == 'edit') {
                    vm.schedule_list.find(x=>x.id == id).classification = schedule.classification;
                    vm.calendar.updateEvent(schedule.id, schedule.prevCalendarId, schedule);
                } else if (type == 'delete') {
                    vm.calendar.deleteEvent(schedule.id, schedule.calendarId);
                }
            });
        });
        // 월간 뷰의 각 셀마다 이벤트 갯수가 초과되어 나타난 'More' 버튼을 클릭할 때 발생
        // calendar.on('clickMoreEventsBtn', (event) => {
        //     console.log(event.date, event.target);
        // });
        vm.calendar = calendar;

        vm.loadScheduleList();
    },
}
</script>