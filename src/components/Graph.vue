<template>
  <!-- * * * * * * * * * * * * * -->
  <div
    id="myDiag"
    style="background-color: white; border: solid 1px black; height: 550px"
  ></div>

  <div
    id="propertiesPanel"
    style="display: none; background-color: aliceblue; border: solid 1px black"
  >
    <b>Properties</b><br />
    Name:
    <input type="text" id="name" :value="addForm.name" /><br />
    Title:
    <input type="text" id="title" :value="addForm.title" /><br />
    Comments:
    <input type="text" id="comments" :value="addForm.comments" /><br />
    <button type="primary" @click="submitData">更改</button>
  </div>

  <div>
    <div>
      <button id="SaveButton" @click="save()">Save</button>
      <button @click="load()">Load</button>
      Diagram Model saved in JSON format:
    </div>
  </div>

  <!-- * * * * * * * * * * * * * -->
  <!--  End of GoJS sample code  -->
</template>
<script>
import go from "gojs";
export default {
  data() {
    return {
      addForm: {},
      selectNode: {},
      myDiagram: null,
      nodeData: {
        class: "go.GraphLinksModel",
        nodeDataArray: [
          { key: "1", name: "Arron", title: "The Boss" },
          { key: "2", name: "Tony", title: "Underboss" },
          { key: "3", name: "Herman", title: "Advisor" },
          { key: "4", name: "家樂福", title: "公司" },
          { key: "5", name: "Ralph", title: "Capo MIA" },
          { key: "6", name: "Silvio", title: "Consigliere" },
          { key: "7", name: "統一食品", title: "公司" },
          { key: "8", name: "Sal", title: "MIA" },
          { key: "9", name: "台積電", title: "公司" },
        ],
        linkDataArray: [
          { from: "1", to: "2" },
          { from: "1", to: "3" },
          { from: "2", to: "4" },
          { from: "2", to: "5" },
          { from: "2", to: "6" },
          { from: "2", to: "7" },
          { from: "4", to: "8" },
          { from: "4", to: "9" },
        ],
      },
    };
  },
  methods: {
    init() {
      var $ = go.GraphObject.make; // for conciseness in defining templates
      var that = this;
      this.$options.myDiagram = $(
        go.Diagram,
        "myDiag", // must be the ID or reference to div
        {
          // make sure users can only create trees
          validCycle: go.Diagram.CycleDestinationTree,
          // users can select only one part at a time
          maxSelectionCount: 1,
          layout: $(go.TreeLayout, {
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal,
            // properties for most of the tree:
            angle: 90,
            layerSpacing: 35,
            // properties for the "last parents":
            alternateAngle: 0,
            alternateLayerSpacing: 35,
            alternateAlignment: go.TreeLayout.AlignmentStart,
            alternateNodeIndent: 10,
            alternateNodeIndentPastParent: 1.0,
            alternateNodeSpacing: 10,
            alternateLayerSpacingParentOverlap: 1.0,
            alternatePortSpot: new go.Spot(0.01, 1, 10, 0),
            alternateChildPortSpot: go.Spot.Left,
          }),
          // support editing the properties of the selected person in HTML
          ChangedSelection: onSelectionChanged,
          TextEdited: onTextEdited,
          // enable undo & redo
          "undoManager.isEnabled": true,
        }
      );

      // when the document is modified, add a "*" to the title and enable the "Save" button

      this.$options.myDiagram.addDiagramListener("Modified", () => {
        var button = document.getElementById("SaveButton");
        if (button) button.disabled = !this.$options.myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (this.$options.myDiagram.isModified) {
          if (idx < 0) document.title += "*";
        } else {
          if (idx >= 0) document.title = document.title.substr(0, idx);
        }
      });

      var graygrad = $(go.Brush, "Linear", {
        0: "rgb(125, 125, 125)",
        0.5: "rgb(86, 86, 86)",
        1: "rgb(86, 86, 86)",
      });

      // define the Node template
      this.$options.myDiagram.nodeTemplate = $(
        go.Node,
        "Auto",
        { doubleClick: nodeDoubleClick },
        {
          // handle dragging a Node onto a Node to (maybe) change the reporting relationship
          mouseDragEnter: function (e, node, prev) {
            console.log(prev);
            var diagram = node.diagram;
            var selnode = diagram.selection.first();
            if (!mayWorkFor(selnode, node)) return;
            var shape = node.findObject("SHAPE");
            if (shape) shape.fill = "darkred";
          },
          mouseDragLeave: function (e, node, next) {
            console.log(next);
            var shape = node.findObject("SHAPE");
            if (shape) shape.fill = graygrad;
          },
          mouseDrop: function (e, node) {
            var diagram = node.diagram;
            var selnode = diagram.selection.first(); // assume just one Node in selection
            if (mayWorkFor(selnode, node)) {
              // find any existing link into the selected node
              var link = selnode.findTreeParentLink();
              if (link !== null) {
                // reconnect any existing link
                link.fromNode = node;
              } else {
                // else create a new link
                diagram.toolManager.linkingTool.insertLink(
                  node,
                  node.port,
                  selnode,
                  selnode.port
                );
              }
            }
          },
        },
        // for sorting, have the Node.text be the data.name
        new go.Binding("text", "name"),
        // bind the Part.layerName to control the Node's layer depending on whether it isSelected
        new go.Binding("layerName", "isSelected", function (sel) {
          return sel ? "Foreground" : "";
        }).ofObject(),
        // define the node's outer shape
        $(go.Shape, "RoundedRectangle", {
          name: "SHAPE",
          fill: graygrad,
          stroke: "black",
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          cursor: "pointer",
        }),
        // define the panel where the text will appear
        $(
          go.Panel,
          "Table",
          {
            maxSize: new go.Size(150, 999),
            margin: new go.Margin(3, 3, 0, 3),
            defaultAlignment: go.Spot.Left,
          },
          $(go.RowColumnDefinition, { column: 2, width: 4 }),
          $(
            go.TextBlock, // the name
            {
              row: 0,
              column: 0,
              columnSpan: 5,
              font: "bold 9pt sans-serif",
              editable: true,
              isMultiline: false,
              stroke: "white",
              minSize: new go.Size(10, 14),
              name: "name",
            },
            new go.Binding("text", "name").makeTwoWay()
          ),
          $(go.TextBlock, "Title: ", textStyle(), { row: 1, column: 0 }),
          $(
            go.TextBlock,
            textStyle(),
            {
              row: 1,
              column: 1,
              columnSpan: 4,
              editable: true,
              isMultiline: false,
              minSize: new go.Size(10, 14),
              margin: new go.Margin(0, 0, 0, 3),
              name: "title",
            },
            new go.Binding("text", "title").makeTwoWay()
          ),
          $(
            go.TextBlock,
            "ID: ",
            textStyle(), // the ID and the boss
            { row: 2, column: 0 }
          ),
          $(
            go.TextBlock,
            textStyle(),
            { row: 2, column: 1 },
            new go.Binding("text", "key")
          ),
          // $(go.TextBlock, "Boss: ", textStyle(), { row: 2, column: 3 }),
          $(
            go.TextBlock,
            textStyle(),
            { row: 2, column: 4 },
            new go.Binding("text", "parent")
          ),
          $(
            go.TextBlock, // the comments
            {
              row: 3,
              column: 0,
              columnSpan: 5,
              font: "italic 9pt sans-serif",
              wrap: go.TextBlock.WrapFit,
              editable: true, // by default newlines are allowed
              stroke: "white",
              minSize: new go.Size(10, 14),
              name: "comments",
            },
            new go.Binding("text", "comments").makeTwoWay()
          ),
          $("TreeExpanderButton", {
            row: 4,
            columnSpan: 99,
            alignment: go.Spot.Center,
          })
        ) // end Table Panel
      ); // end Node

      // define the Link template
      this.$options.myDiagram.linkTemplate = $(
        go.Link,
        go.Link.Orthogonal,
        { corner: 5, relinkableFrom: true, relinkableTo: true },
        $(go.Shape, { strokeWidth: 2 })
      ); // the link shape

      this.$options.myDiagram.linkTemplateMap.add(
        "Support",
        $(
          go.Link,
          go.Link.Bezier,
          { isLayoutPositioned: false, isTreeLink: false, curviness: -50 },
          { relinkableFrom: true, relinkableTo: true },
          $(go.Shape, { stroke: "green", strokeWidth: 2 }),
          $(go.Shape, {
            toArrow: "OpenTriangle",
            stroke: "green",
            strokeWidth: 2,
          }),
          $(go.TextBlock, new go.Binding("text", "text"), {
            stroke: "green",
            background: "rgba(255,255,255,0.75)",
            maxSize: new go.Size(80, NaN),
          })
        )
      );

      this.$options.myDiagram.linkTemplateMap.add(
        "Motion",
        $(
          go.Link,
          go.Link.Bezier,
          { isLayoutPositioned: false, isTreeLink: false, curviness: -50 },
          { relinkableFrom: true, relinkableTo: true },
          $(go.Shape, { stroke: "orange", strokeWidth: 2 }),
          $(go.Shape, {
            toArrow: "OpenTriangle",
            stroke: "orange",
            strokeWidth: 2,
          }),
          $(go.TextBlock, new go.Binding("text", "text"), {
            stroke: "orange",
            background: "rgba(255,255,255,0.75)",
            maxSize: new go.Size(80, NaN),
          })
        )
      );

      // read in the JSON-format data from the "mySavedModel" element
      this.load();
      // when a node is double-clicked, add a child to it
      function nodeDoubleClick(e, obj) {
        console.log("雙擊node");
        var clicked = obj.part;
        if (clicked !== null) {
          var thisemp = clicked.data;
          that.$options.selectNode = thisemp;
          console.log(that.$options.selectNode);
          that.$options.myDiagram.startTransaction("add employee");
          var nextkey = (
            that.$options.myDiagram.model.nodeDataArray.length + 1
          ).toString();
          var newemp = { key: nextkey, name: "(new person)", title: "" };
          that.$options.myDiagram.model.addNodeData(newemp);
          that.$options.myDiagram.model.addLinkData({
            from: thisemp.key,
            to: nextkey,
          });
          that.$options.myDiagram.commitTransaction("add employee");
          // console.log(that.$options.myDiagram.model);
        }
      }

      // this is used to determine feedback during drags
      function mayWorkFor(node1, node2) {
        if (!(node1 instanceof go.Node)) return false; // must be a Node
        if (node1 === node2) return false; // cannot work for yourself
        if (node2.isInTreeOf(node1)) return false; // cannot work for someone who works for you
        return true;
      }

      // This function provides a common style for most of the TextBlocks.
      // Some of these values may be overridden in a particular TextBlock.
      function textStyle() {
        return { font: "9pt sans-serif", stroke: "white" };
      }
      // Allow the user to edit text when a single node is selected
      function onSelectionChanged(e) {
        var node = e.diagram.selection.first();

        if (node instanceof go.Node) {
          updateProperties(node.data);
          that.selectNode = node.data;
        } else {
          updateProperties(null);
        }
      }

      // Update the HTML elements for editing the properties of the currently selected node, if any
      function updateProperties(data) {
        if (data === null) {
          document.getElementById("propertiesPanel").style.display = "none";
          document.getElementById("name").value = "";
          document.getElementById("title").value = "";
          document.getElementById("comments").value = "";
        } else {
          document.getElementById("propertiesPanel").style.display = "block";
          document.getElementById("name").value = data.name || "";
          document.getElementById("title").value = data.title || "";
          document.getElementById("comments").value = data.comments || "";
        }
      }

      // This is called when the user has finished inline text-editing
      function onTextEdited(e) {
        console.log("編輯完畢");
        var tb = e.subject;
        if (tb === null || !tb.name) return;
        var node = tb.part;
        if (node instanceof go.Node) {
          updateData(tb.text, tb.name);
          updateProperties(node.data);
        }
      }

      // Update the data fields when the text is changed
      function updateData(text, field) {
        var node = that.$options.myDiagram.selection.first();
        // maxSelectionCount = 1, so there can only be one Part in this collection
        var data = node.data;
        if (node instanceof go.Node && data !== null) {
          var model = that.$options.myDiagram.model;
          model.startTransaction("modified " + field);
          if (field === "name") {
            model.setDataProperty(data, "name", text);
          } else if (field === "title") {
            model.setDataProperty(data, "title", text);
          } else if (field === "comments") {
            model.setDataProperty(data, "comments", text);
          }
          model.commitTransaction("modified " + field);
        }
      }
    },
    // Show the diagram's model in JSON format
    save() {
      this.nodeData = this.$options.myDiagram.model.toJson();
      console.log("save");
      console.log(this.nodeData);
      this.$options.myDiagram.isModified = false;
    },
    load() {
      console.log("load");
      this.$options.myDiagram.model = go.Model.fromJson(this.nodeData);
      console.log(this.$options.myDiagram.model);
    },
    submitData() {
      // console.log(this.myDiagram);
      this.$options.myDiagram.model.setDataProperty(
        this.selectNode,
        "name",
        document.getElementById("name").value
      ); //然后对这个对象的属性进行更改
      this.$options.myDiagram.model.setDataProperty(
        this.selectNode,
        "title",
        document.getElementById("title").value
      ); //然后对这个对象的属性进行更改
      this.$options.myDiagram.model.setDataProperty(
        this.selectNode,
        "comments",
        document.getElementById("comments").value
      ); //然后对这个对象的属性进行更改
    },
  },
  mounted() {
    this.init();
  },

  created() {},
};
</script>
