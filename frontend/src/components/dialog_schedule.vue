<template>
    <q-dialog v-model="isOpen" :position="position" full-height persistent>
        <q-card class="column full-height" style="min-width: 600px; height: calc(100% - 72px);" >
                <div class="row items-center justify-center w100p q-pa-md">
                    <div class="col">
                        <q-btn dense icon="close" flat @click="onClose" />
                        <q-btn dense icon="open_in_new" flat @click="onPopup" ></q-btn>
                    </div>
                    <div class="col text-h6 text-center faSB">일정 {{ schedule.id > 0 ? '수정' : '생성'}}</div>
                    <div class="col text-right">
                    </div>
                </div>
            <q-separator />
            <q-card-section class="col">
                <div style="width: 100%;">
                    <q-select dense v-model="schedule.classification" :options="classification_list" filled
                        :error="formError.classification?true:false" :error-message="formError.classification"
                        label="분류(필터)">
                        <template v-slot:option="scope">
                            <q-item v-bind="scope.itemProps" dense @click="onClickClassification(scope.opt)">
                                <q-item-section avatar>
                                    <q-badge :style="{backgroundColor: scope.opt.color}" />
                                </q-item-section>
                                <q-item-section >
                                    <q-item-label>{{ scope.opt.title }}</q-item-label>
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                    
                    <q-input filled dense label="일정 제목 *" v-model="schedule.title" label-color="red" @keyup.enter="onSave" 
                        :error="formError.title?true:false" :error-message="formError.title" />
                    
                    
                    <q-input filled dense label="일정 장소" v-model="schedule.location" 
                        @click="onClickLocation" readonly style="cursor: pointer !important;"
                        :error="formError.location?true:false" :error-message="formError.location" />
                    <!-- 시간 -->
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div style="display: flex;">
                            <template v-if="schedule.isAllday == false">
                                <q-field borderless dense outline 
                                    :error="formError.dateTime?true:false" :error-message="formError.dateTime">
                                    <template v-slot:control>
                                        <q-input filled dense v-model="schedule.start" style="width: 200px;" class="q-mr-sm">
                                            <template v-slot:prepend>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="schedule.start" mask="YYYY-MM-DD HH:mm">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup label="닫기" color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                
                                            <template v-slot:append>
                                                <q-icon name="access_time" class="cursor-pointer q-pr-sm">
                                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                        <q-time v-model="schedule.start" mask="YYYY-MM-DD HH:mm" format24h>
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup label="닫기" color="primary" flat />
                                                            </div>
                                                        </q-time>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                        <q-input filled dense v-model="schedule.end" style="width: 200px;">
                                            <template v-slot:prepend>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="schedule.end" mask="YYYY-MM-DD HH:mm">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup label="닫기" color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                
                                            <template v-slot:append>
                                                <q-icon name="access_time" class="cursor-pointer q-pr-sm">
                                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                        <q-time v-model="schedule.end" mask="YYYY-MM-DD HH:mm" format24h>
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup label="닫기" color="primary" flat />
                                                            </div>
                                                        </q-time>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </template>
                                </q-field>
                                
                            </template>
                            <template v-else>
                                <q-field borderless dense outline 
                                    :error="formError.dateTime?true:false" :error-message="formError.dateTime">
                                    <template v-slot:control>
                                        <q-input dense filled v-model="schedule.start" class="q-mr-sm">
                                            <template v-slot:prepend>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="schedule.start" mask="YYYY-MM-DD">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup label="닫기" color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                        <q-input dense filled v-model="schedule.end">
                                            <template v-slot:prepend>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                                        <q-date v-model="schedule.end" mask="YYYY-MM-DD">
                                                            <div class="row items-center justify-end">
                                                                <q-btn v-close-popup label="닫기" color="primary" flat />
                                                            </div>
                                                        </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </template>
                                </q-field>
                            </template>
                        </div>
                        <div>
                            <q-field :error="formError.isAllday?true:false" :error-message="formError.isAllday"
                                dense borderless>
                                <template v-slot:control>
                                    <q-checkbox v-model="schedule.isAllday" label="종일 여부" @update:model-value="onChangeAllDay" /> 
                                </template>
                            </q-field>
                        </div>
                    </div>
                    <div v-if="isDetail">
                        <q-input dense filled label="일정 내용" v-model="schedule.body" type="textarea"
                            :error="formError.body?true:false" :error-message="formError.body">
                            <template v-slot:hint >
                                <div>{{ '(' + schedule.body.length + '/500)자 이내로 작성하세요.' }}</div>
                            </template>
                        </q-input>
                        <q-input clearable filled dense v-model="attend" label="참석자" @keyup.enter="onAddAttend" />
                        <q-list>
                            <q-item v-for="row,idx in schedule.attendees" :key="idx">
                                <q-item-section>
                                    <q-chip :label="row" removable @remove="onRemoveAttend(idx)" />            
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-section align="right">
                <q-btn outline label="닫기" class="q-mr-sm" @click="onClose" />
                <q-btn outline :label="'옵션 ' + (isDetail?'닫기':'더보기')" class="q-mr-sm" @click="isDetail=!isDetail" />
                <q-btn outline color="negative" label="삭제" class="q-mr-sm" v-if="schedule.id > 0" @click="onDelete" />
                <q-btn outline color="positive" label="저장" v-if="schedule.id > 0" @click="onSave" />
                <q-btn outline color="positive" label="추가" v-else @click="onAdd" />
            </q-card-section>
        </q-card>
        
    </q-dialog>
</template>

<script>
import axios from 'axios';
export default {
    name: 'dialog_schedule',
    components: {
    },
    computed: {
    },
    data() {
        return {
            position: 'right',
            classification_list: [],

            isOpen: false,
            isDetail: false,
            isMileStone: false,
            callback: null,
            attend: '',
            schedule: {
                id: 0,                          // 일정 ID
                uid: '',                        // 작성자 uid
                calendarId: '',                 // 캘린더 ID
                classification: '기념일',       // 분류
                title: '',                      // 일정 제목
                body: '',                       // 일정 내용
                isAllday: false,                // 종일 일정 여부
                start: '',                      // 일정이 시작하는 일시.
                end: '',                        // 일정이 끝나는 일시
                location: '',                   // 일정 장소
                attendees: [],                  // 일정 참석자 목록
                status: 1,
                category: 'time',               // 일정 카테고리. milestone, task, allday, time 중 하나이다.
                dueDateClass: '',               // task 일정 카테고리. 어떤 문자열도 가능하다.
                isVisible: true,                // 일정 표시 여부
                isPending: false,	            // 미정인 일정 여부
                isFocused: false,	            // 일정 강조 여부
                isReadOnly: false,	            // 수정 가능한 일정 여부
                isPrivate: false,	            // 개인적인 일정 여부
                color: '#000',	                // 일정 요소의 텍스트 색상
                backgroundColor: '#a1b56c',	    // 일정 요소의 배경 색상
                dragBackgroundColor: '#a1b56c',	// 일정 요소를 드래그했을 때 배경 색상
                borderColor: '#000',     	    // 일정 요소의 좌측 테두리 색상
                // customStyle: {},	            // 일정 요소에 적용할 스타일. CSS 카멜케이스 프로퍼티를 가진 자바스크립트 객체이다.
            },
            formError: {},

            classification: null,
        }
    },
    methods: {
        onPopup() {
            let vm = this;
        },
        onClickLocation() {
            /*global someFunction, daum*/
            // let vm = this;
            // new daum.Postcode({
            //     oncomplete: function(data) {
            //         vm.schedule.location = data.address;
            //     }
            // }).open();
        },
        /* change */
        onChangeMileStone(args) {
            let vm = this;
            vm.$nextTick(() => {
                if(args) {
                    vm.schedule.category = 'milestone';
                } else {
                    if(vm.schedule.isAllday) {
                        vm.schedule.category = 'allday';
                    } else {
                        vm.schedule.category = 'time';
                    }
                }
            });
        },
        /* allday */
        onChangeAllDay(args) {
            let vm = this;
            vm.$nextTick(() => {
                // 종일 여부 체크 : YYYY-MM-DD
                if(args == true) {
                    vm.schedule.start = vm.schedule.start.slice(0, 11);
                    vm.schedule.end = vm.schedule.end.slice(0, 11);
                } 
                // 종일 여부 체크해제 : YYYY-MM-DD HH:mm:ss
                else {
                    vm.schedule.start = vm.schedule.start + " 00:00:00";
                    vm.schedule.end = vm.schedule.end + " 00:00:00";
                }

                if(!vm.isMileStone) {
                    if(args) {
                        vm.schedule.category = 'allday';
                    } else {
                        vm.schedule.category = 'time';
                    }
                }
            });
        },
        setSchedule(schedule) {
            let vm = this;
            vm.schedule = schedule;
            vm.isMileStone = schedule.category == 'milestone' ? true : false;
            if(vm.schedule.isAllday) {
                vm.schedule.start = window.$c.formatDate(schedule.start, "YYYY-MM-DD");
                vm.schedule.end = window.$c.formatDate(schedule.end, "YYYY-MM-DD");
            } else {
                vm.schedule.start = window.$c.formatDate(schedule.start, "YYYY-MM-DD");
                vm.schedule.end = window.$c.formatDate(schedule.end, "YYYY-MM-DD");
            }
        },

        /* classification */
        onClickClassification(args) {
            let vm = this;
            vm.classification = args;
            vm.schedule.classification = args.title;
            vm.schedule["prevCalendarId"] = vm.schedule.calendarId;
            vm.schedule.calendarId = String(args.coupleScheduleClassificationId);
            vm.schedule["backgroundColor"] = args.color;
            vm.schedule["dragBackgroundColor"] = args.color;
        },

        /* attend */
        onRemoveAttend(idx) {
            let vm = this;
            vm.schedule.attendees.splice(idx, 1);
        },
        onAddAttend() {
            let vm = this;
            let text = vm.attend;
            vm.schedule.attendees.push(text);
            vm.attend = '';
        },  


        /* function */
        onClose() {
            let vm = this;
            vm.isOpen = false;
            if(vm.callback) { vm.callback(); }
        },
        open(obj, callback) {
            let vm = this;
            vm.mode = obj.mode;
            vm.setSchedule(obj.schedule);
            if(callback) { vm.callback = callback; }
            vm.isOpen = true;
        },

        /* 일정을 추가하는 함수 */
        onAdd() {
            let vm = this;
            vm.$q.loading.show();
            window.$c.form.clearError(vm.formError);
            vm.schedule["uid"] = vm.$store.state.account.uid;
            // console.log("schedule:", vm.schedule);
            axios.post(`/api/schedule`, {
                schedule: vm.schedule,
            }).then((res) => {
                let response = res.data;
                if(response.status === 200) {
                    window.$c.response_notify("check", "positive", response.message);
                    vm.schedule.id = response.data;
                    vm.callback(vm.schedule);
                    vm.isOpen = false;
                }
                vm.$q.loading.hide();
            }).catch((err) => {
                vm.$q.loading.hide();
                if(err?.response?.status === 400) {
                    let errors = err.response?.data?.data?.errors;
                    window.$c.form.setError(vm.formError, errors);
                }
            });
        },
        onSave() {
            let vm = this;
            vm.$q.loading.show();
            vm.$store.state.clearError(vm.formError);
            let scheduleId = vm.schedule.id;
            axios.put(`/api/schedules/${scheduleId}`, {
                params: {
                    schedule: vm.schedule,
                }
            }).then((res) => {
                let data = res.data;
                if(data.success) {
                    vm.$q.notify({
                        icon: 'check',
                        message: data.message,
                        color: 'positive',
                    });
                    vm.callback(vm.schedule, 'edit');
                    vm.isOpen = false;
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
                        alert(data.message);
                    }
                }
                vm.$q.loading.hide();
            }).catch((err) => {
                vm.$q.notify({
                    icon: 'error',
                    color: 'negative',
                    message: vm.$store.state.catchErrorMessage,
                });
                vm.$q.loading.hide();
            });
        },
        onDelete() {
            let vm = this;
            vm.$q.dialog({
                title: '확인',
                message: '삭제한 데이터는 복구할 수 없습니다. <br>그래도 진행하시겠어요?',
                cancel: true,
                html: true,
                persistent: true
            }).onOk(() => {
                onAcceptDelete();
            }).onCancel(() => {
                
            });
            function onAcceptDelete() {
                vm.$q.loading.show();
                let scheduleId = vm.schedule.id;
                axios.delete(`/api/schedules/${scheduleId}`, {}).then((res) => {
                    let data = res.data;
                    if(data.success) {
                        vm.$q.notify({
                            icon: 'check',
                            color: 'positive',
                            message: data.message
                        });
                        vm.callback(vm.schedule, 'delete');
                    } else {
                        if(Object.prototype.hasOwnProperty.call(data, "error") == true) {
                            vm.$store.setError(vm.formError, data.error);
                        }
                        if(Object.prototype.hasOwnProperty.call(data, "message") == true) {
                            alert(data.message);
                        }
                    }
                    vm.$q.loading.hide();
                    vm.isOpen = false;
                }).catch((err) => {
                    vm.$q.notify({
                        icon: 'error',
                        color: 'negative',
                        message: vm.$store.state.catchErrorMessage,
                    });
                    vm.$q.loading.hide();
                });
            }
        },
    },
    mounted() {
        let vm = this;
        
    }
}
</script>