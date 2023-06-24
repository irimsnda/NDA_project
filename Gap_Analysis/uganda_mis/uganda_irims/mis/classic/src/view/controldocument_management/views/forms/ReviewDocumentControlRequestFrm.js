/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.controldocument_management.views.forms.ReviewDocumentControlRequestFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'reviewdocumentcontrolrequestfrm',
    itemId: 'documentcontrolrequestfrm',
    layout: {
        type: 'column'
    },viewModel: 'controldocumentmanagementvm',
    bodyPadding: 5,
    is_readonly: true,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top'
    },
    autoScroll:true,
    items: [{
            xtype: 'fieldcontainer',
            layout: 'column',
            columnWidth: 0.5,
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Control Document Name',
            items: [
                {
                    xtype: 'textfield',
                    name: 'control_document_name',
                    readOnly: true,
                    allowBlank: false,
                    columnWidth: 0.9
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    stores:'[]',
                    winWidth: '70%',
                    winTitle:'Control Documents Master List',
                    childXtype:'controldocumentsreglistgrid',
                    tooltip: 'Search Control Document',
                    handler: 'funcSearchControlDocument'
                }
            ]
        },{
            xtype: 'combo',
            fieldLabel: 'Control Document Type',
            columnWidth: 0.5,
            readOnly: true,
            name: 'controldocument_type_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,  allowBlank: false,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_controldocument_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: 'Document No',  allowBlank: false,
            name: 'document_no'
        },{
            xtype: 'textfield',
            fieldLabel: 'Version No',  
            allowBlank: false,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            name: 'version_no'
        },{
            xtype:'combo',
            fieldLabel:'Prepared By',  allowBlank: false,
            valueField: 'id',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            displayField: 'fullnames',
            forceSelection: true,
            queryMode: 'local',
            name:'requested_by',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_controldocument_positions',
                                filters:JSON.stringify({'position_title_id':1})
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype:'datefield',
            fieldLabel:'Document Application Date',
            format:'Y-m-d',
            allowBlank: false,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            name:'doc_application_date',  altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype:'combo',
            fieldLabel:'Authorised By',  allowBlank: false,
            name:'approved_by',
            valueField: 'id', hidden: true,
            displayField: 'fullnames',
            forceSelection: true,
            queryMode: 'local',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_controldocument_positions',
                                filters:JSON.stringify({'position_title_id':2})
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'combo',
            fieldLabel:'Checked By',  allowBlank: false,
            name:'checked_by',
            valueField: 'id',
            displayField: 'fullnames',
            forceSelection: true,
            queryMode: 'local',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_controldocument_positions',
                                filters:JSON.stringify({'position_title_id':3})
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype:'datefield',format:'Y-m-d',
            fieldLabel:'Approval Date',  allowBlank: false, hidden: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            name:'approval_date',  altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype:'datefield',format:'Y-m-d',
            fieldLabel:'Effective Date',  allowBlank: false,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            name:'effective_date_from',  altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype:'datefield',format:'Y-m-d',
            fieldLabel:'Next Review Date',  allowBlank: false,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            name:'next_review_date',altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'textarea',
            columnWidth: 1,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            fieldLabel: 'Remarks',  allowBlank: false,
            name: 'remarks'
        },{
            xtype:'hiddenfield',
            name:'controldoc_master_id'
        },{
            xtype:'hiddenfield',
            name:'reg_doccontrolreview_id'
        }
    ],
    buttons:[{
        text:'Save Reviewed Control Document Application',
        iconCls:'fa fa-save',
        margin:5,action_url: 'controldocumentsmng/saveReviewedControlDocumentDetails',
        handler:'saveReviewedControlDocumentApplication'
    }, {
        text:'Submit Control Document Application',
        ui: 'soft-purple',
        iconCls: 'fa fa-check',
        name: 'process_submission_btn',
        storeID: 'controldocumentmanagementdashstr',
        table_name: 'tra_doccontrolreview_management',
        winWidth: '50%'
    }]
});