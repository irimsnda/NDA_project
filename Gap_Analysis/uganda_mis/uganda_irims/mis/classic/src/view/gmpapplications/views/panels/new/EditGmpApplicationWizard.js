
Ext.define('Admin.view.gmpapplications.views.panels.new.EditGmpApplicationWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.editgmpapplicationwizard',
    viewModel: 'gmpapplicationsvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    itemId: 'editgmpapplicationwizardId',
    layout: 'card',
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            //height: 40,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:11px"
            },
            items: [ {
                xtype: 'displayfield',
                name: 'process_name',
                hidden: true,
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                hidden: true
            }, {
                xtype: 'displayfield',
                name: 'gmp_type_txt',
                hidden: true,
                hidden: true,
                fieldLabel: 'GMP Type',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator'
            }, {
                xtype: 'displayfield',
                hidden: true,
                name: 'workflow_stage',
                fieldLabel: 'Workflow Stage',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator'
            }, {
                xtype: 'displayfield',
                hidden: true,
                name: 'application_status',
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator'
            }, {
                xtype: 'displayfield',
                name: 'tracking_no',
                hidden: true,
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'displayfield',
                name: 'reference_no',
                hidden: true,
                fieldLabel: 'Reference No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',
                    'margin-top': '-2px'
                }
            }, {
                xtype: 'tbspacer'
            }, {
                xtype: 'hiddenfield',
                name: 'process_id'
            }, {
                xtype: 'hiddenfield',
                name: 'workflow_stage_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }, {
                xtype: 'hiddenfield',
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }, {
                xtype: 'hiddenfield',
                name: 'gmp_type_id'
            } /*{
                xtype: 'hiddenfield',
                name: 'premise_id'
            }, {
                xtype: 'hiddenfield',
                name: 'manufacturing_site_id'
            }, {
                xtype: 'hiddenfield',
                name: 'registered_manufacturing_site_id'
            }, {
                xtype: 'hiddenfield',
                name: 'applicant_id'
            }*/
            ,{
                    xtype: 'combo',
                    fieldLabel: 'GMP Type',
                    // labelWidth: 120,
                    // width: 400,
                    name: 'gmp_type_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    labelStyle: 'font-weight:bold',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_gmplocation_details'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change: function (cmbo, newVal) {
                            // var pnl = cmbo.up('panel'),
                                //ltr_selection = pnl.down('combo[name=applicant_as_ltr]');
                            // if (newVal == 2 || newVal === 2) {
                            //     ltr_selection.setValue(1);
                            //     ltr_selection.setReadOnly(true);
                            // }else{
                            //     ltr_selection.setValue(2);
                            //     ltr_selection.setReadOnly(false);
                            // }
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Device Type',
                    name: 'device_type_id',
                    forceSelection: true,
                    allowBlank: true,
                    hidden: true,
                    queryMode: 'local',
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_device_types'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Assessment Type',
                   // labelWidth: 120,
                   // width: 400,
                    name: 'assessment_type_id',
                    valueField: 'id',
                    displayField: 'name',
                    queryMode: 'local',
                    allowBlank: false,
                    forceSelection: true,
                    labelStyle: 'font-weight:bold',
                    listeners: {
                        beforerender: {
                            fn: 'setParamCombosStore',
                            config: {
                                pageSize: 1000,
                                proxy: {
                                    url: 'commonparam/getCommonParamFromTable',
                                    extraParams: {
                                        table_name: 'par_gmp_assessment_types'
                                    }
                                }
                            },
                            isLoad: true
                        }
                    }
                }
            ,'->',{
                    xtype: 'fieldcontainer',
                    layout: 'column',
                    defaults: {
                        labelAlign: 'top'
                    },
                    fieldLabel: 'Application Details',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'reference_no',
                            hidden: false,
                            readOnly: true,
                            columnWidth: 0.9
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-search',
                            columnWidth: 0.1,
                            hidden: false,
                            text: 'Search',
                            tooltip: 'Select Application',
                            name: 'select_applications',
                            childXtype: 'allgmpappgrid',
                            winTitle:'GMP Applications',
                            winWidth:'70%',
                            handler: 'showGmpApplicationsSelectionList'
                        }
                    ]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'vbox',
                    //items: [{
                    //     xtype: 'combo',
                    //     fieldLabel: 'GMP Type',
                    //     labelWidth: 120,
                    //     width: 400,
                    //     name: 'gmp_type_id',
                    //     valueField: 'id',
                    //     displayField: 'name',
                    //     queryMode: 'local',
                    //     allowBlank: false,
                    //     forceSelection: true,
                    //     labelStyle: 'font-weight:bold',
                    //     listeners: {
                    //         beforerender: {
                    //             fn: 'setParamCombosStore',
                    //             config: {
                    //                 pageSize: 1000,
                    //                 proxy: {
                    //                     url: 'commonparam/getCommonParamFromTable',
                    //                     extraParams: {
                    //                         table_name: 'par_gmplocation_details'
                    //                     }
                    //                 }
                    //             },
                    //             isLoad: true
                    //         },
                    //         change: function (cmbo, newVal) {
                    //             // var pnl = cmbo.up('panel'),
                    //                 //ltr_selection = pnl.down('combo[name=applicant_as_ltr]');
                    //             // if (newVal == 2 || newVal === 2) {
                    //             //     ltr_selection.setValue(1);
                    //             //     ltr_selection.setReadOnly(true);
                    //             // }else{
                    //             //     ltr_selection.setValue(2);
                    //             //     ltr_selection.setReadOnly(false);
                    //             // }
                    //         }
                    //     }
                    // },
                    // {
                    //     xtype: 'combo',
                    //     fieldLabel: 'Device Type',
                    //     name: 'device_type_id',
                    //     forceSelection: true,
                    //     allowBlank: true,
                    //     hidden: true,
                    //     queryMode: 'local',
                    //     valueField: 'id',
                    //     displayField: 'name',
                    //     listeners: {
                    //         beforerender: {
                    //             fn: 'setParamCombosStore',
                    //             config: {
                    //                 pageSize: 10000,
                    //                 proxy: {
                    //                     url: 'commonparam/getCommonParamFromTable',
                    //                     extraParams: {
                    //                         table_name: 'par_device_types'
                    //                     }
                    //                 }
                    //             },
                    //             isLoad: true
                    //         }
                    //     }
                    // },
                    // {
                    //     xtype: 'combo',
                    //     fieldLabel: 'Assessment Type',
                    //     labelWidth: 120,
                    //     width: 400,
                    //     name: 'assessment_type_id',
                    //     valueField: 'id',
                    //     displayField: 'name',
                    //     queryMode: 'local',
                    //     allowBlank: false,
                    //     forceSelection: true,
                    //     labelStyle: 'font-weight:bold',
                    //     listeners: {
                    //         beforerender: {
                    //             fn: 'setParamCombosStore',
                    //             config: {
                    //                 pageSize: 1000,
                    //                 proxy: {
                    //                     url: 'commonparam/getCommonParamFromTable',
                    //                     extraParams: {
                    //                         table_name: 'par_gmp_assessment_types'
                    //                     }
                    //                 }
                    //             },
                    //             isLoad: true
                    //         }
                    //     }
                    // }],
                }
            ]
        }
    ],
    // tbar: [
    //     {
    //         name: 'applicationdetailsform',
    //         dock: 'top',
    //         frame: true,
    //         width: '100%',
    //         layout: 'column',
    //         defaults: {
    //             columnWidth: 0.25,
    //             margin: 5,
    //             labelAlign: 'top'
    //         },
    //         bodyPadding: 5,
    //         items: [
    //             {
    //                 xtype: 'combo',
    //                 fieldLabel: 'GMP Type',
    //                 labelWidth: 120,
    //                 width: 400,
    //                 name: 'gmp_type_id',
    //                 valueField: 'id',
    //                 displayField: 'name',
    //                 queryMode: 'local',
    //                 allowBlank: false,
    //                 forceSelection: true,
    //                 labelStyle: 'font-weight:bold',
    //                 listeners: {
    //                     beforerender: {
    //                         fn: 'setParamCombosStore',
    //                         config: {
    //                             pageSize: 1000,
    //                             proxy: {
    //                                 url: 'commonparam/getCommonParamFromTable',
    //                                 extraParams: {
    //                                     table_name: 'par_gmplocation_details'
    //                                 }
    //                             }
    //                         },
    //                         isLoad: true
    //                     },
    //                     change: function (cmbo, newVal) {
    //                         // var pnl = cmbo.up('panel'),
    //                             //ltr_selection = pnl.down('combo[name=applicant_as_ltr]');
    //                         // if (newVal == 2 || newVal === 2) {
    //                         //     ltr_selection.setValue(1);
    //                         //     ltr_selection.setReadOnly(true);
    //                         // }else{
    //                         //     ltr_selection.setValue(2);
    //                         //     ltr_selection.setReadOnly(false);
    //                         // }
    //                     }
    //                 }
    //             },
    //             {
    //                 xtype: 'combo',
    //                 fieldLabel: 'Device Type',
    //                 name: 'device_type_id',
    //                 forceSelection: true,
    //                 allowBlank: true,
    //                 hidden: true,
    //                 queryMode: 'local',
    //                 valueField: 'id',
    //                 displayField: 'name',
    //                 listeners: {
    //                     beforerender: {
    //                         fn: 'setParamCombosStore',
    //                         config: {
    //                             pageSize: 10000,
    //                             proxy: {
    //                                 url: 'commonparam/getCommonParamFromTable',
    //                                 extraParams: {
    //                                     table_name: 'par_device_types'
    //                                 }
    //                             }
    //                         },
    //                         isLoad: true
    //                     }
    //                 }
    //             },
    //             {
    //                 xtype: 'combo',
    //                 fieldLabel: 'Assessment Type',
    //                 labelWidth: 120,
    //                 width: 400,
    //                 name: 'assessment_type_id',
    //                 valueField: 'id',
    //                 displayField: 'name',
    //                 queryMode: 'local',
    //                 allowBlank: false,
    //                 forceSelection: true,
    //                 labelStyle: 'font-weight:bold',
    //                 listeners: {
    //                     beforerender: {
    //                         fn: 'setParamCombosStore',
    //                         config: {
    //                             pageSize: 1000,
    //                             proxy: {
    //                                 url: 'commonparam/getCommonParamFromTable',
    //                                 extraParams: {
    //                                     table_name: 'par_gmp_assessment_types'
    //                                 }
    //                             }
    //                         },
    //                         isLoad: true
    //                     }
    //                 }
    //             }
    //         ]
    //     }
    // ],

    items: [
        {
            xtype: 'applicationapplicantpnl',
            autoScroll: true
        },
        {
            xtype: 'mansitedetailstabpnl',//'mansitedetailspanel'
            autoScroll: true
        },
        {
            xtype: 'productlinedetailsgrid',
            autoScroll: true
        },
        {
            xtype: 'gmpproductslinkagedetailsgrid',
            autoScroll: true
        },
        {
            xtype: 'gmpappdocuploadsgenericgrid',
            autoScroll: true
        },{
            xtype: 'producteditvariationrequestsgrid',
        }
    ],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'MANUFACTURING SITE DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    name: 'line_details',
                    text: 'PRODUCT LINE DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-cubes',
                    enableToggle: true,
                    text: 'PRODUCT DETAILS',
                    action: 'quickNav'
                },
                {
                    step: 4,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav'
                },
                {
                    step: 5,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'Clean-Up Request',
                    action: 'quickNav'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                   
                    name: 'prev_btn',
                    handler: 'onPrevCardClickMoreDetailsAlt'
                },
                '->',
                {
                    text: 'Update Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1,
                    handler: 'saveGmpEditAppBaseDetails'
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                   
                    name: 'next_btn',
                    handler: 'onNextCardClickMoreDetailsAlt'
                }
            ]
        };
        me.callParent(arguments);
    }
});
