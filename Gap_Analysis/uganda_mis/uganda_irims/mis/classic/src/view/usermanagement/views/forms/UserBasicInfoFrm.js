/**
 * Created by Kip on 8/17/2018.
 */
Ext.define('Admin.view.usermanagement.views.forms.UserBasicInfoFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.userbasicinfofrm',
    bodyPadding: 8,
    controller: 'usermanagementvctr',
    autoScroll: true,
    /*layout:{
        type: 'vbox'
    },*/
    items: [
        {
            xtype: 'container',
            layout: 'column',
            margin: '0 0 10 0',
            items: [
                {
                    xtype: 'image',
                    cls: 'userProfilePic',
                    name: 'user_photo',
                    height: 120,
                    width: 120,
                    columnWidth: 0.1,
                    alt: 'profile-picture',
                    src: 'resources/images/placeholder.png'
                }, {
                    xtype: 'filefield',
                    buttonOnly: true,
                    name: 'profile_photo',
                    buttonText: 'Upload',
                    anchor: '100%',
                    margin: '0 0 0 5',
                    labelWidth: 200,
                    columnWidth: 0.85,
                    listeners: {
                        change: 'uploadUserImage'
                    }
                },
                {
                    xtype: 'hiddenfield',
                    name: 'saved_name'
                }
            ]
        }, {
            xtype: 'container',
            layout: 'column',
            defaults: {
                labelAlign: 'top',
                labelStyle: {
                    'font-weight': 'bold'
                },
                allowBlank: true
            },
            fieldDefaults: {
                xtype: 'textfield',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold'
                }
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    fieldLabel: 'id',
                    columnWidth: 0.25,
                    margin: '0 20 20 0',
                    name: 'id'
                }, {
                    xtype: 'textfield',
                    value: token,
                    name: '_token',
                    hidden: true
                }, {
                    xtype: 'hiddenfield',
                    fieldLabel: 'table name',
                    value: 'users',
                    margin: '0 20 20 0',
                    name: 'table_name'
                }, {
                    xtype: 'hiddenfield',
                    value: 'title_id,gender_id,zone_id,department_id,directorate_id,has_account_timestamp,active_from,active_to,has_expiry_exemption,expiry_exemption_remark,has_dormant_exemption,dormant_exemption_remark,has_password_change_exemption,password_change_exemption',
                    name: 'skip'
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Title',
                    reference: 'titleField',
                    displayField: 'name',
                    valueField: 'id',
                    columnWidth: 0.25,
                    allowBlank: false,
                    margin: '0 20 0 0',
                    name: 'title_id',
                    // editable: true,
                    forceSelection: true,
                    queryMode: 'local',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setUserCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Title'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'First Name',
                    columnWidth: 0.25,
                    allowBlank: false,
                    margin: '0 20 0 0',
                    name: 'first_name',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    enableKeyEvents: true,
                    listeners: {
                        change: 'updateModelUserFirstNameOnChange'
                    }
                    //bind: '{firstName}'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Other Names',
                    allowBlank: false,
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'last_name',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    enableKeyEvents: true,
                    listeners: {
                        change: 'updateModelUserLastNameOnChange'
                    }
                    //bind: '{lastName}'
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Gender',
                    
                    displayField: 'name',
                    valueField: 'id',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'gender_id',
                    forceSelection: true,
                    allowBlank: true,
                    hidden: true,
                    queryMode: 'local',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setUserCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Gender'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Email Address',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'email',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    allowBlank: false,
                    vtype: 'email',
                    enableKeyEvents: true,
                    listeners: {
                        change: 'updateModelUserEmailOnChange'
                    }
                    //bind: '{email}'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Phone/Mobile No',
                    allowBlank: true,
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'phone',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Mobile No',
                    allowBlank: true,
                    hidden: true,
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'mobile',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Department',
                    forceSelection: true,
                    columnWidth: 0.25,
                    allowBlank: true,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'directorate_id',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Directorate'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmb, newVal) {
                            var form = cmb.up('form'),
                                departmentsStore = form.down('combo[name=department_id]').getStore(),
                                directoryUnitStore = form.down('combo[name=directorate_units]').getStore(),
                                filters = JSON.stringify({'directorate_id':newVal});
                            departmentsStore.removeAll();
                            directoryUnitStore.removeAll();
                            departmentsStore.load({params: {directorate_id: newVal}});
                            directoryUnitStore.load({params: {filters: filters}});
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Division',
                    forceSelection: true,
                    columnWidth: 0.25,
                    allowBlank: true,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'department_id',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url:'organisationconfig/getDepartments',
                                    extraParams: {
                                        model_name: 'Department'
                                    }
                                }
                            },
                            isLoad: false
                        },
                        // change: function (cmb, newVal) {
                        //     var form = cmb.up('form'),
                        //         wizard=form.up('userswizardfrm'),
                        //         dragGroupStore=wizard.down('draggroupgrid').getStore();
                        //       dragGroupStore.removeAll();
                        //       dragGroupStore.load();
                        // }
                    }
                },{
                    xtype: 'tagfield',
                    fieldLabel: 'Directorate Units',
                    margin: '0 20 0 0',
                    name: 'directorate_units',
                    valueField: 'id',
                    displayField: 'name',
                    forceSelection: true,
                    queryMode: 'local',
                    allowBlank: true, 
                    hidden: true,
                    filterPickList: true,
                    encodeSubmitValue: true,
                    growMax: 80,
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_directorate_units'
                                    }
                                }
                            },
                            isLoad: false
                        }
                       
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Zone',
                    forceSelection: true,
                    columnWidth: 0.25,
                    allowBlank: true,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'zone_id',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    extraParams: {
                                        model_name: 'Zone'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmb, newVal) {
                            var form = cmb.up('form'),
                                wizard=form.up('userswizardfrm'),
                                dragGroupStore=wizard.down('draggroupgrid').getStore();
                            dragGroupStore.removeAll();
                            dragGroupStore.load();
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'User Category',
                    forceSelection: true,
                    columnWidth: 0.25,
                    allowBlank: false,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'user_category_id',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_user_categories'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmb, newVal,oldvalue,eopts) {
                            var form = cmb.up('form'),
                                externalCat=form.down('combo[name=externaluser_category_id]'),
                                ints=form.down('textfield[name=institution]');
                            if(newVal==2){
                                  externalCat.setVisible(true);
                                  ints.setVisible(true);
                              }else{
                                  externalCat.setVisible(false);
                                  ints.setVisible(false);
                             }
                        }
                    }
                },{
                    xtype: 'combo',
                    fieldLabel: 'External User Category',
                    forceSelection: true,
                    columnWidth: 0.25,
                    allowBlank: true,
                    hidden: true,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'externaluser_category_id',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    listeners: {
                        beforerender: {
                            fn: 'setOrgConfigCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_externaluser_categories'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                  },{
                    xtype: 'textfield',
                    name: 'institution',
                    hidden: true,
                    columnWidth: 0.25,
                    fieldLabel: 'Institution',
                    allowBlank: true
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Has Account Timestamp',
                    forceSelection: true,
                    columnWidth: 0.25,
                    allowBlank: false,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'has_account_timestamp',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    store: 'confirmationstr',
                    listeners: {
                        change: function (cmb, newVal,oldvalue,eopts) {
                            var form = cmb.up('form'),
                                active_from=form.down('datefield[name=active_from]'),
                                active_to=form.down('datefield[name=active_to]');
                                expiry_exemption_remark=form.down('combo[name=has_expiry_exemption]');
                                dormant_exemption_remark=form.down('combo[name=has_dormant_exemption]');
                                password_change_exemption=form.down('combo[name=has_password_change_exemption]');
                            if(newVal==1){
                                  active_from.setVisible(true);
                                  active_to.setVisible(true);
                                  expiry_exemption_remark.setVisible(true);
                                  dormant_exemption_remark.setVisible(true);
                                  password_change_exemption.setVisible(true);
                              }else{
                                  active_from.setVisible(false);
                                  active_to.setVisible(false);
                                  expiry_exemption_remark.setVisible(false)
                                  dormant_exemption_remark.setVisible(false);
                                  password_change_exemption.setVisible(false);
                             }
                        }
                    }
                },
                {
                    xtype: 'datefield',
                    columnWidth: 0.25,
                    name: 'active_from',
                    margin: '0 20 0 0',
                    fieldLabel: 'Active From',
                    hidden: true,
                    allowBlank: true, 
                    submitFormat: 'Y-m-d',
                    format: 'd/m/Y',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },
                {
                    xtype: 'datefield',
                    columnWidth: 0.25,
                    margin: '0 20 0 0',
                    name: 'active_to',
                    fieldLabel: 'Active To',
                    hidden: true,
                    allowBlank: true,
                    submitFormat: 'Y-m-d',
                    format: 'd/m/Y',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
      
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Has Expiry Exemption',
                    forceSelection: true,
                    hidden: true,
                    columnWidth: 0.5,
                    allowBlank: true,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'has_expiry_exemption',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    store: 'confirmationstr',
                    listeners: {
                        change: function (cmb, newVal,oldvalue,eopts) {
                            var form = cmb.up('form'),
                                expiry_exemption_remark=form.down('textarea[name=expiry_exemption_remark]');
                            if(newVal==1){
                                  expiry_exemption_remark.setVisible(true);
                              }else{
                                  expiry_exemption_remark.setVisible(false);
                             }
                        }
                    }
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Expiry Exemption Remarks',
                    margin: '0 20 0 0',
                    columnWidth: 0.5,
                    name: 'expiry_exemption_remark',
                    allowBlank: true,
                    hidden: true
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Has Dorminant Exemption',
                    forceSelection: true,
                    hidden: true,
                    columnWidth: 0.5,
                    allowBlank: true,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'has_dormant_exemption',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    store: 'confirmationstr',
                    listeners: {
                        change: function (cmb, newVal,oldvalue,eopts) {
                            var form = cmb.up('form'),
                                dormant_exemption_remark=form.down('textarea[name=dormant_exemption_remark]');
                            if(newVal==1){
                                  dormant_exemption_remark.setVisible(true);
                              }else{
                                  dormant_exemption_remark.setVisible(false);
                             }
                        }
                    }
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Dormant Exemption Remarks',
                    margin: '0 20 0 0',
                    columnWidth: 0.5,
                    name: 'dormant_exemption_remark',
                    allowBlank: true,
                    hidden: true
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Has Password Change Exemption',
                    forceSelection: true,
                    columnWidth: 0.5,
                    hidden: true,
                    allowBlank: true,
                    queryMode: 'local',
                    margin: '0 20 0 0',
                    name: 'has_password_change_exemption',
                    displayField: 'name',
                    valueField: 'id',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold'
                    },
                    store: 'confirmationstr',
                    listeners: {
                        change: function (cmb, newVal,oldvalue,eopts) {
                            var form = cmb.up('form'),
                                password_change_exemption=form.down('textarea[name=password_change_exemption_remark]');
                            if(newVal==1){
                                  password_change_exemption.setVisible(true);
                              }else{
                                  password_change_exemption.setVisible(false);
                             }
                        }
                    }
                },
                {
                    xtype: 'textarea',
                    fieldLabel: 'Password Change Exemption Remarks',
                    margin: '0 20 0 0',
                    columnWidth: 0.5,
                    name: 'password_change_exemption_remark',
                    allowBlank: true,
                    hidden: true
                },

            ]
        }
    ]
});