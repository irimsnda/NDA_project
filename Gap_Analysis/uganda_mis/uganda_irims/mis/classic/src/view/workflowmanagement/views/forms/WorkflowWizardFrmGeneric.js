/**
 * Created by Kip on 9/23/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.forms.WorkflowWizardFrmGeneric', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.workflowwizardfrmgeneric',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],

    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'workflowstagesgridgeneric'
        },
        {
            xtype: 'workflowtransitionsgridgeneric'
        },
        {
            xtype: 'panel',
            items:[
                {
                    xtype: 'workflowdiagramcontainer',
                    //id: 'wf_diagramID',
                    listeners: {
                        afterrender: function () {
                            var el = this.getEl(),
                                wizardFrm = this.up('workflowwizardfrmgeneric'),
                                workflow_id = wizardFrm.down('hiddenfield[name=active_workflow_id]').getValue();
                            el.dom.src = base_url + '/workflow/showWorkflowDiagram?workflow_id=' + workflow_id;
                        }
                    }
                }
            ]
        },
        {
            xtype: 'hiddenfield',
            name: 'active_workflow_id'
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
                    iconCls: 'fa fa-cubes',
                    pressed: true,
                    enableToggle: true,
                    text: 'WORKFLOW STAGES/STATES',
                    action: 'quickNav',
                    handler: 'quickNavigationGeneric'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-arrows',
                    enableToggle: true,
                    text: 'WORKFLOW TRANSITIONS',
                    action: 'quickNav',
                    handler: 'quickNavigationGeneric'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-sitemap',
                    enableToggle: true,
                    text: 'WORKFLOW DIAGRAM',
                    action: 'quickNav',
                    handler: 'quickNavigationGeneric'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                '->',
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    formBind: true,
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    action: 'next_user_card',
                    handler: 'onPrevCardClickGeneric'
                },
                {
                    text: 'Refresh Diagram',
                    hidden: true,
                    ui: 'soft-purple',
                    iconCls: 'fa fa-refresh',
                    bind: {
                        //hidden: '{!atEnd}'
                    },
                    handler: function(){
                        document.getElementById('wf_diagramID').contentDocument.location.reload(true);
                    }
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    formBind: true,
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    action: 'next_user_card',
                    handler: 'onNextCardClickGeneric'
                }
            ]
        };
        me.callParent(arguments);
    }
});
