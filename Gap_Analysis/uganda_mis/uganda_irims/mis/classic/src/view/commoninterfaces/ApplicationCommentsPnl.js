/**
 * Created by Kip on 2/11/2019.
 */
Ext.define('Admin.view.commoninterfaces.ApplicationCommentsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationcommentspnl',
    layout: 'fit',
    controller: 'commoninterfacesVctr',
    frame: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'comment_type_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'application_code'
        },
        {
            xtype: 'form',
            bodyPadding: 5,
            hidden: true,
            layout: 'form',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },{
					xtype: 'combo',
					queryMode: 'local',
					forceSelection: true,
					valueField: 'id',
					displayField: 'name',
					fieldLabel: 'Overrall Recommendation',
					name: 'recommendation_id',
					listeners: {
						beforerender: {
							fn: 'setConfigCombosStore',
							config: {
								pageSize: 100,
								proxy: {
									url: 'commonparam/getCommonParamFromTable',
									extraParams: {
										table_name: 'par_evaluation_recommendations'
									}
								}
							},
							isLoad: true
						}
					}
				},
                 {
                    xtype: 'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    valueField: 'id',
                    displayField: 'name',
                    fieldLabel: 'Assessment By',
                    value: user_id,
                    name: 'assessment_by',
                    listeners: {
                        beforerender: {
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 100,
                                proxy: {
                                    url: 'usermanagement/getUserList',
                                }
                            },
                            isLoad: true
                        }
                    }
                },
                {
                    xtype: 'textarea',
                    name: 'comment',
					//isFocusable: true,
					fieldLabel:'Conclusion Comments/Remarks',
                   // emptyText: 'Your comment...',
                    allowBlank: false,
					 
                }
            ],
            buttons: [
                {
                    xtype: 'button',
                    text: 'Save Comment',
                    ui: 'soft-purple',
                    name: 'save_comment',
                    iconCls: 'x-fa fa-save',
                    formBind: true
                },
                {
                    text: 'Cancel',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-close',
                    handler: 'cancelAddApplicationComment'
                }
            ]
        },
        {
            xtype: 'applicationcommentsgrid'
        }
    ]
});