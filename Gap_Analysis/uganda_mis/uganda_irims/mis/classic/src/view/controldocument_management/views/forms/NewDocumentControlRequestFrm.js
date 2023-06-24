/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.controldocument_management.views.forms.NewDocumentControlRequestFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'newdocumentcontrolrequestfrm',
    itemId: 'documentcontrolrequestfrm',
    layout: {
        type: 'column'
    },viewModel: 'controldocumentmanagementvm',
    is_readonly: false,
    bodyPadding: 5,
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
                    childXtype:'controldocpreviewmasterlistgrid',
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
            fieldLabel: 'Document Control No',  allowBlank: false,
            name: 'document_no'
        },{
            xtype: 'textfield',
            fieldLabel: 'Revision No',  allowBlank: false,
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
            displayField: 'name',
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
        // {
        //     xtype:'datefield',
        //     fieldLabel:'Document Application Date',
        //     format:'Y-m-d', 
        //     bind: {
        //         readOnly: '{isReadOnly}'  // negated
        //     },
        //     hidden: true,
        //     allowBlank: true,
        //     name:'doc_application_date',  altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        // },
        {
            xtype:'datefield',format:'Y-m-d',
            fieldLabel:' Effective Date',  allowBlank: false,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            name:'effective_date_from',  altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype:'datefield',format:'Y-m-d',
            fieldLabel:' Next Review Date',  allowBlank: false,
      
            name:'next_review_date',altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype:'combo',
            fieldLabel:'Authorized By',  allowBlank: false,
            name:'approved_by',
            valueField: 'id',
            displayField: 'name',
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
        },
        // {
        //     xtype:'datefield',format:'Y-m-d',
        //     fieldLabel:'Approval Date',  allowBlank: true,
        //     bind: {
        //         readOnly: '{isReadOnly}'  // negated
        //     },
        //     hidden: true,
        //     name:'approval_date',  altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        // },
        {
            xtype:'combo',
            fieldLabel:'Checked By',  allowBlank: false,
            name:'checked_by',
            valueField: 'id',
            displayField: 'name',
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
            xtype: 'textarea',
            columnWidth: 1,
            fieldLabel: 'Remarks',  allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            name: 'remarks'
        },{
            xtype:'hiddenfield',
            name:'controldoc_master_id'
        }
    ],
    buttons:[{
        text:'Save Control Document Application',
        iconCls:'fa fa-save',
        margin:5,action_url: 'controldocumentsmng/saveNewControlDocumentDetails',
        handler:'saveReviewedControlDocumentApplication'
    }]
});